import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';

const SideNavItem= props => { 
    const classes = useStyles();
    const history = useHistory();

    return (  
        <button className={classes.sideNavItem} onClick={() => history.push(props.route)}>
            {props.text}
        </button>
    );
}

const useStyles = createUseStyles({
    sideNavItem: {
        padding: {
            top: 6,
            right: 6,
            bottom: 6,
            left: 6
        },
        'text-decoration': 'none',
        'font-size': 20,
        color: '#000',
        display: 'block',
        '&:hover': {
            color: '#7927DC', 
            cursor: 'pointer'
        },
        background: 'none !important',
        border: 'none',
    }
});

export default SideNavItem