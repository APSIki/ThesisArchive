import React from 'react';
import { createUseStyles } from 'react-jss';
import TopBarButton from './TopBarButton'
import ModalContainer from '../components/Modal/ModalContainer';

const Layout = props => { 
  const currentYear = new Date().getFullYear();
  const classes = useStyles()

  const getUserName = authorization => {
      return props.config.users && props.config.users.filter(user => user.authorization === authorization)[0].name
  }

  return (
    <React.Fragment>
        <div className={classes.topBar}>
            <nav style={{display: "flex"}}>
                <p className={classes.title}>ARCHIWUM PRAC DYPLOMOWYCH</p>
                <ModalContainer triggerText="Zaloguj" modalAction="selectUser" />
                <p className={classes.username}>Użytkownik: {getUserName(props.config.authorization)}</p>
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
        display: "flex",
        flexDirection: "row",
        paddingLeft: 30,
        zIndex: 1
    },
    footer: {
        position: "fixed",
        bottom: 0,
        paddingBottom: 5,
        left: "50%",
        transform: "translateX(-50%)"
    },
    title: {
        color: "#EEE",
        paddingTop: 8,
        fontWeight: "bold",
        marginRight: 20
    },
    username: {
        color: "#EEE",
        paddingTop: 8,
        marginLeft: 10
    }
});

export default Layout;   