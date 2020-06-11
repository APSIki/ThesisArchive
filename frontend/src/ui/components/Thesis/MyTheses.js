import React from 'react';
import { Grid } from '@material-ui/core';
import SingleThesis from './SingleThesis';
import ModalContainer from '../Modal/ModalContainer';
import * as roles from '../../../tools/roleUtils'

const MyTheses = props => { 
 
  return (
    <Grid container spacing={1}>
        {props.theses.map((thesis, id) => (
          <Grid item xs={3} sm={3}>
            <SingleThesis 
              thesis={thesis}
              key={id} />
          </Grid>
        ))}
        {roles.canAddNewThesis(props.theses) && (
          <ModalContainer triggerText='Dodaj pracę dyplomową' modalAction="addThesis" /> 
        )}
    </Grid>
  );
}

export default MyTheses;