import React from 'react';
import { useHistory } from 'react-router-dom'
import { createUseStyles } from 'react-jss';
import { Button } from '@material-ui/core';

const ThesisDetailsModalForm = props => { 
  const classes = useStyles();
  const history = useHistory();


 
  return (
    <React.Fragment>
        <p className={classes.header}>Szczegóły pracy</p>
        <div className={classes.container}>
          <p>EloooooooooooooooooooooooooooooooooooooooooooooElooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>
          <p>Elooooooooooooooooooooooooooooooooooooooooooooo</p>

        </div>
    </React.Fragment>
  );
}

const useStyles = createUseStyles({
    header: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column"
    }
});

export default ThesisDetailsModalForm