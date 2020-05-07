import React from 'react';
import { createUseStyles } from 'react-jss';
import { Grid } from '@material-ui/core';
import SingleThesis from './SingleThesis';

const MyTheses = props => { 
  const classes = useStyles();
 
  return (
    <Grid container spacing={2}>
        {props.theses.map(thesis => (
          <SingleThesis thesis={thesis} />
        ))}
    </Grid>
  );
}

const useStyles = createUseStyles({
    container: {
        flexDirection: "row"
    }
});

export default MyTheses;