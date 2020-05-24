import React from 'react';
import { Grid } from '@material-ui/core';
import SingleThesis from './SingleThesis';

const MyTheses = props => { 
 
  return (
    <Grid container spacing={1}>
        {props.theses.map((thesis, id) => (
          <SingleThesis 
          thesis={thesis}
          key={id} />
        ))}
    </Grid>
  );
}

export default MyTheses;