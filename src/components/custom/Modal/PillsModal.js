import React, { useState, Fragment, useEffect } from 'react';
import { CustomInput, Row, Col, ModalHeader, ModalFooter, Modal, ModalBody, Media, Button } from 'reactstrap';

import Datetime from 'react-datetime';
import { FIELDS } from '../../../helpers/costants';

const PillsModal = (props) => {

    const [collapseOne, collapseOneOpen] = useState(props.collapseOne);
    const [startDatePills, setStartDatePills] = useState(null);
    const [endDatePills, setEndDatePills] = useState(null);
    const [pillsColor, setPillsColor] = useState("warning");
    const [pillsField, setPillsField] = useState({ value: 'totale_attualmente_positivi', label: 'Positivi' });


    React.useEffect(() => {
        collapseOneOpen(props.collapseOne);
    }, [props.collapseOne])
    return (
        < Fragment >
            <Modal isOpen={collapseOne} toggle={() => { collapseOneOpen(!collapseOne) }}>
                <ModalHeader>Costurisci la tua pillola</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            Data di inizio
                            </Col>
                        <Col>
                            Data fine
                            </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Datetime
                                timeFormat={false}
                                value={startDatePills}
                                onChange={setStartDatePills}
                                locale="it"
                                dateFormat="DD-MM-YYYY"
                                inputProps={{ placeholder: 'Seleziona data inizio', id: 'startDatePill' }}
                            />
                        </Col>
                        <Col>
                            <Datetime
                                timeFormat={false}
                                value={endDatePills}
                                onChange={setEndDatePills}
                                locale="it"
                                dateFormat="DD-MM-YYYY"
                                inputProps={{ placeholder: 'Seleziona data fine', id: 'endDatePill' }}

                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CustomInput
                                id="colorPillCombo"
                                type="select"
                                bsSize="lg"
                                className="xs-12 shadow"
                                value={pillsColor}
                                onChange={({ target }) => setPillsColor(target.value)}
                            >
                                <option value='warning'>  Rosso </option>
                                <option value='info'>Giallo</option>
                                <option value='success'>Verde</option>

                            </CustomInput>
                        </Col>
                        <Col>
                            <CustomInput
                                id="dataTypePillCombo"
                                type="select"
                                bsSize="lg"
                                className="xs-12 shadow"
                                value={pillsField.value}
                                onChange={({ target }) => { setPillsField({ label: target.selectedOptions[0].label, value: target.value }) }}
                            >
                                <option value={FIELDS.TOTALE_ATTUALMENTE_POSITIVI}> Positivi </option>
                                <option value={FIELDS.TOTALE_OSPEDALIZZATI}>Ospedalizzati</option>
                                <option value={FIELDS.TERAPIA_INTENSIVA}>In terapia intensiva</option>
                                <option value={FIELDS.DECEDUTI}>Deceduti</option>
                                <option value={FIELDS.DIMESSI_GUARITI}>Dimessi guariti</option>
                                <option value={FIELDS.RICOVERATI_CON_SINTOMI}>Ricoverati con sintomi</option>
                                <option value={FIELDS.ISOLAMENTO_DOMICILIARE}>Isolamento domiciliare</option>
                                <option value={FIELDS.NUOVI_ATTUALMENTE_POSITIVI}>Nuovi attualmente positivi</option>
                                <option value={FIELDS.TOTALE_CASI}>Totale Casi</option>
                                <option value={FIELDS.TAMPONI}>Tamponi</option>

                            </CustomInput>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => { collapseOneOpen(!collapseOne) }}>
                        Chiudi
                        </Button>
                    <Button onClick={() => {
                        props.callback({
                            startDatePills: startDatePills,
                            endDatePills: endDatePills, pillsColor: pillsColor,
                            pillsField: pillsField
                        }); collapseOneOpen(!collapseOne)
                    }} color="primary">
                        Aggiungi Pillola
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment >
    );
}

export default PillsModal;
