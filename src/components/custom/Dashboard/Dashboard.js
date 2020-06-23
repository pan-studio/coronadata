import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Card, CardBody, Button, InputGroup, CustomInput, Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import CardSummary from '../Pills/CardSummary';
import ActiveUsersBarChart from '../../dashboard/ActiveUsersBarChart';
import InfectedLineChart from '../Charts/InfectedLineChart';
import { toast } from 'react-toastify';
import FalconCardHeader from '../../common/FalconCardHeader';
import ButtonIcon from '../../common/ButtonIcon';
import { ENDPOINT, FIELDS } from '../../../helpers/costants';
import loadable from '@loadable/component';
import { evaluatePergentageBetweenTwoNumber, convertMonthFromNumberToString, convertDateFromString } from '../../../helpers/utils';
import { useTranslation, Trans } from 'react-i18next';
import Loader from '../../common/Loader';
import Automata from '../Automata/Automata';
import PillsModal from '../Modal/PillsModal';
import CalendarRange from '../Calendars/CalendarRange';
import moment from 'moment';
import LeafletMap from '../LeafletMap/LeafletMap';
const DashboardDataTable = loadable(() => import('../DataTable/DataTable'));
const ActiveUsersMap = loadable(() => import('../../dashboard/ActiveRegionsMap'));
const jsonQuery = require('json-query');

const Dashboard = () => {
  // State
  const { t, i18n } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [geoJsonState, setGeoJsonState] = useState(null);
  const [datiTotali, setDatiTotali] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [datiProvincialiLoaded, setDatiProvincialiLoaded] = useState(false);
  const [datiProvinciali, setDatiProvinciali] = useState([
    {
      data: "",
      stato: "ITA",
      codice_regione: 0,
      denominazione_regione: "",
      codice_provincia: 0,
      denominazione_provincia: "",
      sigla_provincia: "",
      lat: 0,
      long: 0,
      totale_casi: 0,
      note_it: "",
      note_en: ""
    }]);
  const [datiRegionaliLoaded, setDatiRegionaliLoaded] = useState(false);
  const [datiRegionali, setDatiRegionali] = useState([{
    "data": "",
    "stato": "ITA",
    "codice_regione": -1,
    "denominazione_regione": "",
    "lat": 0,
    "long": 0,
    "ricoverati_con_sintomi": 0,
    "terapia_intensiva": 0,
    "totale_ospedalizzati": 0,
    "isolamento_domiciliare": 0,
    "totale_attualmente_positivi": 0,
    "nuovi_attualmente_positivi": 0,
    "dimessi_guariti": 0,
    "deceduti": 0,
    "totale_casi": 0,
    "tamponi": 0
  }]);
  const [dateTime, setDateTime] = useState(['0']);
  const [cardsPills, setCardsPills] = useState([]);
  const [dataByStatus, setDataByStatus] = useState({
    ricoverati_con_sintomi: [0],
    terapia_intensiva: [0],
    totale_ospedalizzati: [0],
    isolamento_domiciliare: [0],
    totale_attualmente_positivi: [0],
    nuovi_attualmente_positivi: [0],
    dimessi_guariti: [0],
    deceduti: [0],
    totale_casi: [0],
    tamponi: [0]

  });
  const [openPillModal, setOpenPillModal] = useState(false);

  useEffect(() => {


    fetch('https://cors-anywhere.herokuapp.com/http://www.coronadata.it/getdata.php?data=andamentoNazionale').
      then(response => response.json())
      .then((data) => {
        debugger;
        var dateTimeTmp = [];
        let cardsPillsTmp = [];
        var dataByStatusTmp = {
          ricoverati_con_sintomi: [0],
          terapia_intensiva: [0],
          totale_ospedalizzati: [0],
          isolamento_domiciliare: [0],
          totale_attualmente_positivi: [0],
          nuovi_attualmente_positivi: [0],
          dimessi_guariti: [0],
          deceduti: [0],
          totale_casi: [0],
          tamponi: [0],
        }
        data.forEach(element => {

          dateTimeTmp.push(convertDateFromString(element.data));
          dataByStatusTmp.ricoverati_con_sintomi.push(element.ricoverati_con_sintomi);
          dataByStatusTmp.terapia_intensiva.push(element.terapia_intensiva);
          dataByStatusTmp.totale_ospedalizzati.push(element.totale_ospedalizzati);
          dataByStatusTmp.isolamento_domiciliare.push(element.isolamento_domiciliare);
          dataByStatusTmp.totale_attualmente_positivi.push(element.totale_attualmente_positivi);
          dataByStatusTmp.nuovi_attualmente_positivi.push(element.nuovi_attualmente_positivi);
          dataByStatusTmp.dimessi_guariti.push(element.dimessi_guariti);
          dataByStatusTmp.deceduti.push(element.deceduti);
          dataByStatusTmp.totale_casi.push(element.totale_casi);
          dataByStatusTmp.tamponi.push(element.tamponi);
        });

        setDatiTotali(data);
        setDateTime(dateTimeTmp);
        setDataByStatus(dataByStatusTmp);

        var today = dateTimeTmp[dateTimeTmp.length - 1].split('-');
        var yesterday = dateTimeTmp[dateTimeTmp.length - 2].split('-');
        cardsPillsTmp.push(<CardSummary rate={evaluatePergentageBetweenTwoNumber(dataByStatusTmp.deceduti[dataByStatusTmp.deceduti.length - 2],
          dataByStatusTmp.deceduti[dataByStatusTmp.deceduti.length - 1]) + '%'} title="Deceduti" color="warning" linkText="Vedi tutti i deceduti">
          <CountUp end={dataByStatusTmp.deceduti[dataByStatusTmp.deceduti.length - 1]} duration={5} prefix="" separator="." decimal="," />
          <CalendarRange type="warning" dayFrom={yesterday[0]} monthFrom={convertMonthFromNumberToString(yesterday[1])}
            dayTo={today[0]} monthTo={convertMonthFromNumberToString(today[1])} />
        </CardSummary>);
        cardsPillsTmp.push(<CardSummary rate={evaluatePergentageBetweenTwoNumber(dataByStatusTmp.totale_casi[dataByStatusTmp.totale_casi.length - 2],
          dataByStatusTmp.totale_casi[dataByStatusTmp.totale_casi.length - 1]) + '%'} title="Positivi" color="info" linkText="Vedi tutti i positivi">
          <CountUp end={dataByStatusTmp.totale_casi[dataByStatusTmp.totale_casi.length - 1]} duration={5} prefix="" separator="." decimal="," />
          <CalendarRange type="info" dayFrom={yesterday[0]} monthFrom={convertMonthFromNumberToString(yesterday[1])}
            dayTo={today[0]} monthTo={convertMonthFromNumberToString(today[1])} />

        </CardSummary>);
        cardsPillsTmp.push(<CardSummary rate={evaluatePergentageBetweenTwoNumber(dataByStatusTmp.dimessi_guariti[dataByStatus.dimessi_guariti.length - 2],
          dataByStatusTmp.dimessi_guariti[dataByStatusTmp.dimessi_guariti.length - 1]) + '%'} title="Guariti" color="success" linkText="Vedi tutti i guariti">
          <CountUp end={dataByStatusTmp.dimessi_guariti[dataByStatusTmp.dimessi_guariti.length - 1]} duration={5} prefix="" separator="." decimal="," />
          <CalendarRange type="success" dayFrom={yesterday[0]} monthFrom={convertMonthFromNumberToString(yesterday[1])}
            dayTo={today[0]} monthTo={convertMonthFromNumberToString(today[1])} />

        </CardSummary>);
        setCardsPills(cardsPillsTmp);
        setDataLoaded(true);
      });



    fetch('https://cors-anywhere.herokuapp.com/' + ENDPOINT.ANDAMENTO_REGIONALE_LATEST)
      .then(response => response.json())
      .then((data) => {
        setDatiRegionali(data);
        setDatiRegionaliLoaded(true);

      });





    fetch('https://cors-anywhere.herokuapp.com/' + ENDPOINT.ITALY_GEOJSON)
      .then(response => response.json())
      .then((data) => {
        setGeoJsonState(data);


        fetch('https://cors-anywhere.herokuapp.com/' + ENDPOINT.ANDAMENTO_PROVINCIALE_LATEST)
          .then(response => response.json())
          .then((data) => {
            var provincieTmp = [];
            data.forEach((element) => {

              if (element.lat != 0 && element.long != 0) {

                provincieTmp.push(element);
              }
            });
            setDatiProvinciali(provincieTmp);
            setDatiProvincialiLoaded(true);
            setIsMapLoaded(true);
          });
      });
  }, []);

  const getNextUpdate = () => {
    let d = new Date();

    if (d.getHours() >= 18 && d.getHours() <= 23)
      return 'Domani ore 18:30';
    else
      return 'Stasera ore 18:30'
  };

  useEffect(() => {
    toast(
      <Fragment>
        <Trans i18nKey="toast.welcome"></Trans>
      </Fragment>
    );
  }, []);

  const evaluatePillsValue = (start, end, field) => {
    var startIndex = 0;
    var endIndex = dateTime.length - 1;
    var startDateConverted = convertDateFromString(start);
    var endDateConverted = convertDateFromString(end);
    var endCount = false;
    var count = 0;
    for (var i = 0; i < dateTime.length; i++) {
      if (!endCount)
        count = count + dataByStatus[field.value][i];

      if (dateTime[i] == startDateConverted) {
        startIndex = i;
        count = dataByStatus[field.value][i];
      }

      if (dateTime[i] == endDateConverted) {
        endIndex = i;
        endCount = true;
      }
    }
    var result = {};
    result.rate = evaluatePergentageBetweenTwoNumber(dataByStatus[field.value][startIndex], dataByStatus[field.value][endIndex]);
    result.startIndex = startIndex;
    result.endIndex = endIndex;
    result.startDateConverted = startDateConverted;
    result.endDateConverted = endDateConverted;
    result.counter = count;
    result.label = field.label;
    return result;
  }

  const addPill = (data) => {

    var tmpC = cardsPills;
    let pillValue = evaluatePillsValue(data.startDatePills, data.endDatePills, data.pillsField);


    tmpC.push(
      <CardSummary rate={pillValue.rate + '%'} title={pillValue.label} color={data.pillsColor} linkText={"Vedi tutti i " + data.pillsField.label}>
        <CountUp end={pillValue.counter} duration={5} prefix="" separator="." decimal="," />
        <CalendarRange type={data.pillsColor} dayFrom={pillValue.startDateConverted.split('-')[0]} monthFrom={convertMonthFromNumberToString(pillValue.startDateConverted.split('-')[1])}
          dayTo={pillValue.endDateConverted.split('-')[0]} monthTo={convertMonthFromNumberToString(pillValue.endDateConverted.split('-')[1])} />
      </CardSummary>
    );
    setCardsPills(tmpC);
    setOpenPillModal(!openPillModal);
  };

  return (


    <Fragment>

      {dataLoaded === false && (
        <Fragment>
          <Loader message="Caricamento Line Chart" icon="chart-pie"></Loader>
        </Fragment>
      )}
      {dataLoaded === true && (
        <InfectedLineChart dateTime={dateTime} dataByStatus={dataByStatus} />
      )}

      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <p className="fs--1 mb-0">
            <Link to="#!">
              <FontAwesomeIcon icon="exchange-alt" transform="rotate-90" className="mr-2" />Visualizza la
              <strong>mappa interattiva</strong> per sapere i dati provincia per provincia
            </Link>
            . Prossimo aggiornamento <strong>{getNextUpdate()}</strong>
          </p>
        </CardBody>
      </Card>
      {isMapLoaded == true ? <LeafletMap markers={datiProvinciali} geoJson={geoJsonState}></LeafletMap> : <Loader message="Caricamento Mappa" icon="map" />}
      <FalconCardHeader subtitle='Le percentuali iniziali sono in relazione alla giornata precedente' title="In Pillole" light={false}>
        <Fragment>
          < PillsModal callback={addPill} collapseOne={openPillModal} />
          <ButtonIcon onClick={() => setOpenPillModal(!openPillModal)} icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
            Nuova Pillola
           </ButtonIcon>
          <ButtonIcon icon="trash" transform="shrink-3 down-2" color="falcon-default" size="sm">
            Elimina Pillola
          </ButtonIcon>
        </Fragment>
      </FalconCardHeader>
      {dataLoaded === false && (
        <Fragment>
          <Loader message="Caricamento Pillole" icon="capsules"></Loader>
        </Fragment>
      )}
      <div style={{ marginTop: 15 }} className="card-deck">
        {
          cardsPills.map(cardPill => {
            return cardPill;
          })
        }
      </div>

      <Card className="mb-3">
        <FalconCardHeader subtitle="Dati aggiornati alla data odierna. per vedere dati relativi ad altre date, clicca su Nuove Date. Clicca sul nome della regione per il dettaglio provinciale" title="Situazione Regionale" light={false}>
          {isSelected ? (
            <InputGroup size="sm" className="input-group input-group-sm">
              <CustomInput type="select" id="bulk-select">
                <option>Bulk actions</option>
                <option value="Delete">Elimina</option>
                <option value="Archive">Esporta selezionati</option>
              </CustomInput>
              <Button color="falcon-default" size="sm" className="ml-2">
                Applica
              </Button>
            </InputGroup>
          ) : (
              <Fragment>
                <ButtonIcon icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
                  Nuove Date
              </ButtonIcon>
                <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
                  Esporta
              </ButtonIcon>
              </Fragment>
            )}
        </FalconCardHeader>
        <CardBody className="p-0">
          {datiRegionaliLoaded === false && (
            <Fragment>
              <Loader message="Caricamento Dati Regioni" icon="map-signs"></Loader>
            </Fragment>

          )}
          {datiRegionaliLoaded === true && (
            <DashboardDataTable dataRegions={datiRegionali} setIsSelected={setIsSelected} />
          )}
        </CardBody>
      </Card>
      <Row noGutters>
        <Col lg="12" className="pl-lg-2">

          <Automata></Automata>

        </Col>
      </Row>

    </Fragment>
  );
};

export default Dashboard;
