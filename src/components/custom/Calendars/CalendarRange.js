import React from 'react';
import PropTypes from 'prop-types';

const CalendarRange = ({ monthFrom, dayFrom, monthTo, dayTo, type }) => {

    let styleMonth = { paddingTop: 15 };
    let styleDay = {};
    switch (type) {
        case "warning":
            styleMonth = { fontSize: 15, paddingTop: 10, backgroundColor: '#f5803e' };
            styleDay = { borderColor: '#f5803e' };
            break;
        case "info":
            styleMonth = { fontSize: 15, paddingTop: 10, backgroundColor: '#27bcfd' };
            styleDay = { borderColor: '#27bcfd' };
            break;
        case "success":
            styleMonth = { fontSize: 15, paddingTop: 10, backgroundColor: '#5ce2aa' };
            styleDay = { borderColor: '#5ce2aa' };
            break;
    };
    return (




        <div style={{ paddingTop: 15 }} class="row">
            <div style={{ paddingLeft: 0, paddingRight: 0 }} class="col">
                <div style={{ margin: 'auto' }} className="calendar">
                    <span style={styleMonth} className="calendar-month">{monthFrom}</span>
                    <span style={styleDay} className="calendar-day">{dayFrom}</span>
                </div>
            </div>
            <div style={{ padding: 0, textAlign: 'center', margin: 'auto' }} class="col">-</div>
            <div style={{ paddingLeft: 0, paddingRight: 0 }} class="col">
                <div style={{ margin: 'auto' }} className="calendar">
                    <span style={styleMonth} className="calendar-month">{monthTo}</span>
                    <span style={styleDay} className="calendar-day">{dayTo}</span>
                </div>
            </div>
        </div>
    )
};

CalendarRange.propTypes = {
    monthFrom: PropTypes.string.isRequired,
    dayFrom: PropTypes.string.isRequired,
    monthTo: PropTypes.string.isRequired,
    dayTo: PropTypes.string.isRequired
};

export default CalendarRange;
