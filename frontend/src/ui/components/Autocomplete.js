import React from 'react';
import { createUseStyles } from 'react-jss';
import MuiAutocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'

const Autocomplete = props => { 
  const classes = useStyles();
 
  return (
    <MuiAutocomplete 
        style={{width: 300}}
        options={props.options}
        getOptionLabel={(option) => option.name}
        renderOption={(option) => (
            <span>{option.name}</span>
        )}
        renderInput={(params) => (
            <TextField
              {...params}
              label=""
              variant="outlined"
              inputProps={{
                ...params.inputProps
              }}
            />
          )}
        onChange={(event, newValue) => {
            props.setValue(newValue)
        }}
        value={props.value}
    />
  );
}

const useStyles = createUseStyles({});

export default Autocomplete