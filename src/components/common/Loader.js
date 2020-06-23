import React from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loader = props => (
  <>
    <Row className="flex-center py-2">
      <Col xs="auto">
        <Spinner {...props} />
      </Col>
    </Row>
    <Row className="flex-center  py-2">
      <Col xs="auto">
        <FontAwesomeIcon icon={props.icon} transform="grow-12" style={{ color: props.color }} />
      </Col>
    </Row>
    <Row className="flex-center  py-2">
      <Col xs="auto">
        {props.message}
      </Col>
    </Row>
  </>
);

Loader.propTypes = { ...Spinner.propTypes };

Loader.defaultProps = {
  type: 'grow',
  size: 'lg',
  color: 'primary',
  message: 'Caricamento',
  icon: 'crown'
};

export default Loader;
