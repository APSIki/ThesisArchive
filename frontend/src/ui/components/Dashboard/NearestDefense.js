import React from 'react';
import { createUseStyles } from 'react-jss';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

const NearestDefense = props => { 
  const classes = useStyles();

  return (
    <Grid item xs={12} xl={12}>
        <Paper className={classes.paper}>
            <p>{props.thesisType}</p>
            <p>{props.thesisName}</p>
            <p><strong>{moment(props.date).format("DD/MM/YYYY HH:mm")}</strong></p>
        </Paper>
    </Grid>
  );
}

const useStyles = createUseStyles({
    paper: {
        padding: 10,
        paddingTop: 2,
        maxWidth: 300,
        backgroundColor: "#cccccc"
    }
});

export default NearestDefense