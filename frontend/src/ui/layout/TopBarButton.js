import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '@material-ui/core';

const TopBarButton = props => { 
  const classes = useStyles()
  return (
    <Button style={props.floatRight ? {float : "right", marginRight: 35} : {}}>
        {props.text}
    </Button>
  );
}

const useStyles = createUseStyles({
    button: {

    }
});

export default TopBarButton