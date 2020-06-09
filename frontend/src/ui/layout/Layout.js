import React from 'react';
import { createUseStyles } from 'react-jss';
import TopBar from './TopBar'

const Layout = props => { 
  const currentYear = new Date().getFullYear();
  const classes = useStyles()

  const getUserName = authorization => {
      return props.config.users && props.config.users.filter(user => user.authorization === authorization)[0].name
  }

  return (
    <React.Fragment>
        <TopBar username={getUserName(props.config.authorization)} />
        <div className={classes.container}>
            {props.children}
        </div>
        <div className={classes.footer}>
            <footer>
                <small>&copy; Copyright {currentYear}, Analiza i projektowanie systemów informacyjnych</small>
            </footer>
        </div>
    </React.Fragment>
  );
}

const useStyles = createUseStyles({
    container: {
        position: "fixed",
        width: "100%",
        height: "100%",
        paddingTop: 48
    },
    footer: {
        position: "fixed",
        bottom: 0,
        paddingBottom: 5,
        left: "50%",
        transform: "translateX(-50%)"
    }
});

export default Layout;   