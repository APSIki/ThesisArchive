import React from 'react';
import { createUseStyles } from 'react-jss';
import { Paper, Grid } from '@material-ui/core';

const SingleThesis = props => { 
  const classes = useStyles();

  return (
    <Grid item xs={12} xl={12}>
        <Paper className={classes.paper}>
            <p><strong>{props.thesis.type}</strong></p>
            <p>{props.thesis.author}</p>
            <p>{props.thesis.name}</p>
            <p className={classes.additionalText}>{props.thesis.additionalText}</p>
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
    },
    additionalText: {
      fontStyle: "italic"
    }
});

export default SingleThesis