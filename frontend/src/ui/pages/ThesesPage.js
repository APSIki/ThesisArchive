import React, {useEffect} from 'react';
import { createUseStyles } from 'react-jss';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import MyThesesContainer from '../../ui/components/Thesis/MyThesesContainer'
import SideNavigation from '../layout/SideNavigation';
import WS from '../../tools/WS';

const LandingPage = props => {
    const classes = useStyles();

    useEffect(() => {
        WS.getUsers().then(response => {
            props.setUsers(response.data)
        })
        
        WS.getTheses().then(response => {
            props.setTheses(response.data)
        })
      }, []);

    useEffect(() => {
        WS.getTheses().then(response => {
            props.setTheses(response.data)
        })
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
                <SideNavigation />
            </Grid>
            <Grid item xs={12} sm={10}>
                <Paper variant="outlined" elevation={3} className={classes.paper}>
                    <MyThesesContainer />
                </Paper>
            </Grid>
        </Grid>
    );
}

const useStyles = createUseStyles({
    paper: {
        padding: 10,
        height: 700,
        marginLeft: 10
      },
    sideNav: {
        height: 500,
        position: "fixed",
        "z-index": 1,
        left: 0,
        "overflow-x": "hidden"
    }  
});

export default LandingPage