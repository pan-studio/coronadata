import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom';
import Background from '../../common/Background';
import corner1 from '../../../assets/img/illustrations/corner-1.png';
import corner2 from '../../../assets/img/illustrations/corner-2.png';
import corner3 from '../../../assets/img/illustrations/corner-3.png';

const getImage = color => {
  switch (color) {
    case 'warning':
      return corner1;
    case 'info':
      return corner2;
    case 'success':
      return corner3;
    default:
      return corner1;
  }
};

const getContentClassNames = color => {
  const contentClassNames = 'display-4 fs-4 mb-2 font-weight-normal text-sans-serif';
  return `${contentClassNames} text-${color}`;
};

const Pill = ({ title, rate, linkText, to, color, children, isChecked }) => {


  return (
    <Card className="mb-3 overflow-hidden" style={{ minWidth: '12rem' }}>
      <Background image={getImage(color)} className="bg-card" />
      <CardBody className="position-relative">
        <h6>
          {title}
          <span className={`badge badge-soft-${color} rounded-capsule ml-2`}>
            {rate}</span>
        </h6>
        <div className={getContentClassNames(color)}>
          <CustomInput
            id={"cardPill_" + (Math.floor(Math.random() * 999999999) + 1)}
            checked={isChecked}
            onChange={({ target }) => isChecked = !target.checked}
            type="checkbox"
            children=

            {children}
          />
        </div>
        <Link className="font-weight-semi-bold fs--1 text-nowrap" to={to}>
          {linkText}
          <FontAwesomeIcon icon="angle-right" transform="down-1.5" className="ml-1" />
        </Link>
      </CardBody>
    </Card>
  );
};

Pill.propTypes = {
  title: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  isSelected: PropTypes.bool,
};

Pill.defaultProps = {
  linkText: 'See all',
  to: '#!',
  color: 'primary'
};

export default Pill;