import React from 'react';
import { createUseStyles } from 'react-jss';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const BigCalendar = props => {
    const classes = useStyles();
    const localizer = momentLocalizer(moment)

    return (
        <Calendar
            localizer={localizer}
            events={props.nearestDefenses.map(defense => ({
                title: defense.thesisName,
                start: moment(defense.date).toDate(),
                end: moment(defense.date).add(1, 'hours').toDate()
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400, width: 600, margin: 10 }}
        />
    );
}

const useStyles = createUseStyles({});

export default BigCalendar