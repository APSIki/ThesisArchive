import React from 'react';
import { createUseStyles } from 'react-jss';
import TopBarButton from './TopBarButton';

const Layout = props => { 
 
  const classes = useStyles()
  return (
    <>
        <div className={classes.topBar}>
            <TopBarButton text="Jakiś link" />
            <TopBarButton text="Inny link" />
            <TopBarButton text="Może jeszcze jeden link" />
            <TopBarButton text="Zaloguj" floatRight />
        </div>
        <div className={classes.container}>
            {props.children}
        </div>
        <div className={classes.footer}>
            © 2020 Very serious developers 
        </div>
    </>
  );
}

const useStyles = createUseStyles({
    container: {
        position: "fixed",
        width: "100%",
        height: "100%",
        paddingTop: 48
    },
    topBar: {
        width: "100%",
        position: "fixed",
        height: 40,
        backgroundColor: "#ccc",
        container: "flex",
        paddingLeft: 30
    },
    footer: {
        position: "fixed",
        bottom: 0,
        padding: 5
    }
});

export default Layout;   