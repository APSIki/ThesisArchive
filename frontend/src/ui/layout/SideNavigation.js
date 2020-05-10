import React from 'react';
import { createUseStyles } from 'react-jss';
import SideNavItem from './SideNavItem'
import ModalContainer from '../components/Modal/ModalContainer';

const SideNavigation = () => { 
    const classes = useStyles();

    return (
        <div className={classes.sideNav}>
            <p className={classes.title}>Menu</p>
            <ModalContainer triggerText='Dodaj prace dyplomową' modalAction="addThesis"/>
            <SideNavItem text='Sprawdź wyniki egzaminu' /> 
            <SideNavItem text='Sprawdź skład komisji' /> 
            <SideNavItem text='Adam Małysz' /> 
            <SideNavItem text='Pan Prezes' /> 
        </div>
    );
}

const useStyles = createUseStyles({
    sideNav: {
        height: 500,
        position: 'fixed',
        'z-index': 1,
        left: 0,
        'overflow-x': 'hidden',
    },
    'title': {
        padding: {
            top: 0,
            right: 6,
            bottom: 6,
            left: 6
        },
        'font-size': 30,
        color: '#000',
        fontWeight: 'bold'
    }
});

export default SideNavigation