import React from 'react';
import { createUseStyles } from 'react-jss';
import { Paper, Grid, IconButton } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'

const SingleThesis = props => { 
  const classes = useStyles();
  const history = useHistory();

  const handleButtonClick = thesisId => {
    history.push(`/thesis/${thesisId}`)
  }
 
  return (
    <Grid item xs={12} xl={12}>
        <Paper className={classes.paper}>
            <p><strong>{props.thesis.type}</strong></p>
            <p>{props.thesis.name}</p>
            <IconButton onClick={() => handleButtonClick(props.thesis.id)}>
                <ArrowForward />
            </IconButton>
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
});

export default SingleThesis