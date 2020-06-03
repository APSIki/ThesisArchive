import React from 'react';
import { createUseStyles } from 'react-jss';
import ModalContainer from '../components/Modal/ModalContainer';
import TopBarLink from './TopBarLinkItem';

const TopBarLinkItem = props => { 
  const classes = useStyles();

  return (
    <div className={classes.topBar}>
        <p className={classes.title}>ARCHIWUM PRAC DYPLOMOWYCH</p>

        <TopBarLink title='Moje prace' href='/' />
        <TopBarLink title='Katalog' href='/catalog' />
        
        <p className={classes.username}>Użytkownik: {props.username}</p>
        <ModalContainer triggerText="Zaloguj" modalAction="selectUser" ButtonAsTrigger />
    </div>
  );
}

const useStyles = createUseStyles({
    topBar: {
        width: "100%",
        position: "fixed",
        height: 40,
        backgroundColor: "#3f51b5",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
        zIndex: 1
    },
    title: {
        color: "#EEE",
        paddingTop: 8,
        fontWeight: "bold",
        marginRight: 45
    },
    username: {
        color: "#EEE",
        paddingTop: 8,
        marginLeft: "auto",
        marginRight: 10,
        fontWeight: "bold"
    }
});

export default TopBarLinkItem