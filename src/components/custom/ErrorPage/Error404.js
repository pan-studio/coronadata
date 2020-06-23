import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

const Error404 = () => (
  <Card className="text-center">
    <CardBody className="p-5">
      <div className="display-1 text-200 fs-error">404</div>
      <p className="lead mt-4 text-800 text-sans-serif font-weight-semi-bold">
        La pagina che stai cercando non e' stata trovata.
      </p>
      <hr />
      <p>
        Assicurati di aver digitato l' indirizzo corretto. se pensi che ci sia un problema
        <a href="mailto:info@pan-studio.it" className="ml-1">
          Contattacci
        </a>
        .
      </p>
      <Link className="btn btn-primary btn-sm mt-3" to="/">
        <FontAwesomeIcon icon="home" className="mr-2" />
        Vai alla Home
      </Link>
    </CardBody>
  </Card>
);

export default Error404;
