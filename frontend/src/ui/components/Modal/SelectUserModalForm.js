import React from 'react';
import { useHistory } from 'react-router-dom'
import { createUseStyles } from 'react-jss';
import { Button } from '@material-ui/core';

const SelectUserModalForm = props => { 
  const classes = useStyles();
  const history = useHistory();

  const selectUser = authorization => {
    props.setAuthorization(authorization)
    history.push('/')
  }
 
  return (
    <React.Fragment>
        <p className={classes.header}>Wybierz użytkownika</p>
        <div className={classes.container}>
            {props.config.users.map(user => (
                <Button onClick={() => selectUser(user.authorization)}>{user.name}</Button>
            ))}
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

export default SelectUserModalForm