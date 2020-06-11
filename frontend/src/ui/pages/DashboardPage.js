import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import SideNavigation from '../layout/SideNavigation';
import WS from '../../tools/WS';
import BigCalendar from '../components/Dashboard/BigCalendar'


const DashboardPage = props => {
    const classes = useStyles();

    useEffect(() => {
        WS.getUsers().then(response => {
            props.setUsers({users: response.data})
        })

        WS.getStaffPersons().then(response => {
            props.setStaffPersons(response.data)
        })

        WS.getDashboardData().then(response => {
            setDashboardData({nearestDefenses: response.data})
        })
    
      }, []);

    useEffect(() => {
        WS.getDashboardData().then(response => {
            setDashboardData({nearestDefenses: response.data})
        })
    })

    const [dashboardData, setDashboardData] = useState({
        nearestDefenses: []
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
                <SideNavigation />
            </Grid>
            <Grid item xs={12} sm={10}>
                <Paper variant="outlined" elevation={3} className={classes.paper}>
                    <p className={classes.header}>Najbliższe obrony:</p>
                    <BigCalendar {...dashboardData} />
                    {/* {dashboardData.nearestDefenses && dashboardData.nearestDefenses.map(defense => (
                        <NearestDefense {...defense} />
                    ))} */}
                </Paper>
            </Grid>
        </Grid>
    );
}

const useStyles = createUseStyles({
    header: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 10
    },
    paper: {
        height: 500
    }
});

export default DashboardPage