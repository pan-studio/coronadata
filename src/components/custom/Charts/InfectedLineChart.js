import React, { useState, useContext } from 'react';
import { Row, Col, Card, CardBody, CustomInput, Input } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { rgbaColor, themeColors, colorsWithOpacity, colors } from '../../../helpers/utils';
import AppContext from '../../../context/Context';
import { FIELDS } from '../../../helpers/costants';
import { useTranslation } from 'react-i18next'


const InfectedLineChart = (props) => {
  const { t, i18n } = useTranslation();
  const [infectedStatus, setInfectedStatus] = useState(FIELDS.TOTALE_ATTUALMENTE_POSITIVI);
  const [dateTime, setDateTime] = useState(props.dateTime);
  const [dataByStatus, setDataByStatus] = useState(props.dataByStatus);

  const [datiRegionaliAll, setDatiRegionaliAll] = useState(props.datiRegionaliAll)
  const [datiNazionali, setDatiNazioni] = useState(props.dataByStatus)
  const [dateTimeNazione, setDateTimeNazionale] = useState(props.dateTime)

  const { isDark } = useContext(AppContext);
  const [lPositivi, setLpositivi] = useState(false);
  const [lOspedalizzati, setLOspedalizzati] = useState(true);
  const [lTerapiaIntensiva, setLTerapiaIntensiva] = useState(true);
  const [lDeceduti, setLDeceduti] = useState(true);
  const [lDimessiGuariti, setLDimessiGuariti] = useState(true);
  const [lRicoveratiConSintomi, setLRicoveratiConSintomi] = useState(true);
  const [lIsolamentoDomiciliare, setLIsolamentoDomiciliare] = useState(true);
  const [lNuoviPositivi, setLNuoviPositivi] = useState(true);
  const [lTotaleCasi, setLTotaleCasi] = useState(true);
  const [lTamponi, setLTamponi] = useState(true);

  const config = {
    data(canvas) {
      const ctx = canvas.getContext('2d');
      const gradientFillPositive = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillPositive.addColorStop(0, isDark ? colorsWithOpacity[0] : colors[9]);
      gradientFillPositive.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');
      const gradientFillOspedalizzati = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillOspedalizzati.addColorStop(0, isDark ? colorsWithOpacity[1] : colors[8]);
      gradientFillOspedalizzati.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');
      const gradientFillTerapiaIntensiva = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillTerapiaIntensiva.addColorStop(0, isDark ? colorsWithOpacity[2] : colors[7]);
      gradientFillTerapiaIntensiva.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');
      const gradientFillDeceduti = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillDeceduti.addColorStop(0, isDark ? colorsWithOpacity[3] : colors[6]);
      gradientFillDeceduti.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');
      const gradientFillDimessiGuariti = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillDimessiGuariti.addColorStop(0, isDark ? colorsWithOpacity[4] : colors[5]);
      gradientFillDimessiGuariti.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');
      const gradientFillRicoveratiConSintomi = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillRicoveratiConSintomi.addColorStop(0, isDark ? colorsWithOpacity[5] : colors[4]);
      gradientFillRicoveratiConSintomi.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');
      const gradientFillIsolamentoDomiciliare = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillIsolamentoDomiciliare.addColorStop(0, isDark ? colorsWithOpacity[6] : colors[3]);
      gradientFillIsolamentoDomiciliare.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');
      const gradientFillNuoviPositivi = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillNuoviPositivi.addColorStop(0, isDark ? colorsWithOpacity[7] : colors[2]);
      gradientFillNuoviPositivi.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');

      const gradientFillTotaleCasi = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillTotaleCasi.addColorStop(0, isDark ? colorsWithOpacity[8] : colors[1]);
      gradientFillTotaleCasi.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');

      const gradientFillTamponi = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFillIsolamentoDomiciliare.addColorStop(0, isDark ? colorsWithOpacity[9] : colors[0]);
      gradientFillIsolamentoDomiciliare.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');

      return {
        labels: dateTime.map(data => data.substring(0, 9)),

        datasets: [
          {
            data: dataByStatus[FIELDS.TOTALE_ATTUALMENTE_POSITIVI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[0] : colors[9], 0.8),
            backgroundColor: gradientFillPositive,
            label: 'Attualmente Positivi',
            hidden: lPositivi,

          },
          {
            data: dataByStatus[FIELDS.TOTALE_OSPEDALIZZATI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[1] : colors[8], 0.8),
            backgroundColor: gradientFillOspedalizzati,
            label: 'Ospedalizzati',
            hidden: lOspedalizzati
          },
          {
            data: dataByStatus[FIELDS.TERAPIA_INTENSIVA],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[2] : colors[7], 0.8),
            backgroundColor: gradientFillTerapiaIntensiva,
            label: 'In terapia intensiva',
            hidden: lTerapiaIntensiva
          },
          {
            data: dataByStatus[FIELDS.DECEDUTI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[3] : colors[6], 0.8),
            backgroundColor: gradientFillDeceduti,
            label: 'Deceduti',
            hidden: lDeceduti
          },
          {
            data: dataByStatus[FIELDS.DIMESSI_GUARITI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[4] : colors[5], 0.8),
            backgroundColor: gradientFillDimessiGuariti,
            label: 'Dimessi guariti',
            hidden: lDimessiGuariti
          },
          {
            data: dataByStatus[FIELDS.RICOVERATI_CON_SINTOMI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[5] : colors[4], 0.8),
            backgroundColor: gradientFillRicoveratiConSintomi,
            label: 'Ricoverati con sintomi',
            hidden: lRicoveratiConSintomi
          },
          {
            data: dataByStatus[FIELDS.ISOLAMENTO_DOMICILIARE],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[6] : colors[3], 0.8),
            backgroundColor: gradientFillIsolamentoDomiciliare,
            label: 'Isolamento odmiciliare',
            hidden: lIsolamentoDomiciliare
          },
          {
            data: dataByStatus[FIELDS.NUOVI_ATTUALMENTE_POSITIVI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[7] : colors[2], 0.8),
            backgroundColor: gradientFillNuoviPositivi,
            label: 'Nuovi positivi',
            hidden: lNuoviPositivi
          },
          {
            data: dataByStatus[FIELDS.TOTALE_CASI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[8] : colors[1], 0.8),
            backgroundColor: gradientFillTotaleCasi,
            label: 'Totale casi',
            hidden: lTotaleCasi
          },
          {
            data: dataByStatus[FIELDS.TAMPONI],
            borderWidth: 2,
            borderColor: rgbaColor(isDark ? colors[9] : colors[0], 0.8),
            backgroundColor: gradientFillIsolamentoDomiciliare,
            label: 'Tamponi',
            hidden: lTamponi
          },
        ]
      };
    },
    options: {

      legend: {
        display: true,
        labels: {
          fontColor: isDark ? colors[0] : colors[9]
        }

      },
      tooltips: {
        mode: 'x-axis',
        xPadding: 20,
        yPadding: 10,
        displayColors: false,
        callbacks: {
          label: tooltipItem => `${dateTime[tooltipItem.index]} - ${tooltipItem.yLabel}`,
          title: () => null
        }
      },
      hover: { mode: 'label' },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              show: true,
              labelString: t('infectedLineCharts.data')
            },
            ticks: {
              fontColor: rgbaColor('#fff', 0.7),
              fontStyle: 600
            },
            gridLines: {
              color: rgbaColor('#fff', 0.1),
              zeroLineColor: rgbaColor('#fff', 0.1),
              lineWidth: 1
            }
          }
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: rgbaColor('#fff', 1)
            },

          }
        ]
      }
    }
  };

  const regions ={
    optionList(){
      const options = [<option key='0' value='0'>Italia</option>]
      datiRegionaliAll.forEach((regione, index) =>{
        options.push(
          <option key={index} value={index}>{regione.denominazione_regione}</option>
        )
      })
      return options
    }
  } 

  return (

    <>

      <Card className="mb-3">
        <CardBody className="rounded-soft bg-gradient">
          <Row className="text-white align-items-center no-gutters">
            <Col>
              <h4 className="text-white mb-0">CoronaData Line Chart</h4>
              <p className="fs--1 font-weight-semi-bold">
                Seleziona o deseleziona le caselle per paragonare i dati
              </p>
            </Col>
            <Col>
              <h4 className="text-white mb-0">Seleziona la regione di interesse</h4>
              <Input type="select" name="region" id="region"
                onChange={({target})=>{ console.log(target.value)}}
               >
                {regions.optionList()}
              </Input>
            </Col>
            <Row>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="lp"
                  checked={!lPositivi}
                  onChange={({ target }) => setLpositivi(!target.checked)}
                  type="checkbox"

                ><label style={{ marginRight: 5 }} for="lp">Positivi</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="lo"
                  checked={!lOspedalizzati}
                  onChange={({ target }) => setLOspedalizzati(!target.checked)}
                  type="checkbox"

                ><label style={{ marginRight: 5 }} for="lo">Ospedalizzati</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="lt"
                  checked={!lTerapiaIntensiva}
                  onChange={({ target }) => setLTerapiaIntensiva(!target.checked)}
                  type="checkbox"

                ><label for="lt">In terapia intensiva</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="ld"
                  checked={!lDeceduti}
                  onChange={({ target }) => setLDeceduti(!target.checked)}
                  type="checkbox"

                ><label for="ld">Deceduti</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="ldg"
                  checked={!lDimessiGuariti}
                  onChange={({ target }) => setLDimessiGuariti(!target.checked)}
                  type="checkbox"

                ><label for="ldg">Dimessi guariti</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="lrcs"
                  checked={!lRicoveratiConSintomi}
                  onChange={({ target }) => setLRicoveratiConSintomi(!target.checked)}
                  type="checkbox"

                ><label for="lrcs">Ricoverati con sintomi</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="lidc"
                  checked={!lIsolamentoDomiciliare}
                  onChange={({ target }) => setLIsolamentoDomiciliare(!target.checked)}
                  type="checkbox"

                ><label for="lidc">Isolamento domiciliare</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="lnp"
                  checked={!lNuoviPositivi}
                  onChange={({ target }) => setLNuoviPositivi(!target.checked)}
                  type="checkbox"

                ><label for="lnp">Nuovi positivi</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="ltcasi"
                  checked={!lTotaleCasi}
                  onChange={({ target }) => setLTotaleCasi(!target.checked)}
                  type="checkbox"

                ><label for="ltcasi">Totale casi</label>
                </CustomInput>
              </Col>
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="lta"
                  checked={!lTamponi}
                  onChange={({ target }) => setLTamponi(!target.checked)}
                  type="checkbox"

                ><label for="lta">Tamponi</label>
                </CustomInput>
              </Col>
            </Row>
          </Row>
          < Line data={config.data} options={config.options} width={1618} height={375} />
        </CardBody>
      </Card>
    </>
  );
};

export default InfectedLineChart;
