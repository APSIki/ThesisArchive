import React from 'react';
import { createUseStyles } from 'react-jss';
import TopBarButton from './TopBarButton';

const Layout = props => { 
 
  const currentYear = new Date().getFullYear();
  const classes = useStyles()
  return (
    <React.Fragment>
        <div className={classes.topBar}>
            <nav>
                <TopBarButton text="Jakiś link" />
                <TopBarButton text="Inny link" />
                <TopBarButton text="Może jeszcze jeden link" />
                <TopBarButton text="Zaloguj" floatRight />
            </nav>
        </div>
        <div className={classes.container}>
            {props.children}
        </div>
        <div className={classes.footer}>
            <footer>
                <small>&copy; Copyright {currentYear}, Very serious developers</small>
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
    topBar: {
        width: "100%",
        position: "fixed",
        height: 40,
        backgroundColor: "#7927DC",
        container: "flex",
        paddingLeft: 30
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