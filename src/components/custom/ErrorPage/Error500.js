import React from 'react';
import { Card, CardBody } from 'reactstrap';

const Error500 = () => (
  <Card className="text-center">
    <CardBody className="p-5">
      <div className="display-1 text-200 fs-error">500</div>
      <p className="lead mt-4 text-800 text-sans-serif font-weight-semi-bold">Oooops, qualcosa e' andato storto!</p>
      <hr />
      <p>
        Ricarica la pagina, o prova a tornare indietro e a ricliccare sul link. Se l' errore persiste
        <a href="mailto:info@pan-studio.it" className="ml-1">
          contattacci
        </a>
        .
      </p>
    </CardBody>
  </Card>
);

export default Error500;
