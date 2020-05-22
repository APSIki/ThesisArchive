import React from 'react';
import { Button } from '@material-ui/core';

const TopBarButton = props => { 

  return (
    <Button style={props.floatRight ? {float : "right", marginRight: 35, color: "#fff"} : {color: "#fff", zIndex: 999}} {...props}>
        {props.text}
    </Button>
  );
}

export default TopBarButton