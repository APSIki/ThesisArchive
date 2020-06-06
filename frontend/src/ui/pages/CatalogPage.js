import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WS from '../../tools/WS';
import TabPanel from '../components/Catalog/TabPanel'
import BasicSearch from '../components/Search/BasicSearch'
import AdvancedSearch from '../components/Search/AdvancedSearch'
import PropsGenerator from '../components/Catalog/PropsGenerator'


const CatalogPage = () => {

    const [tabNumber, setTabNumber] = useState(0);

    const handleChange = (event, newValue) => {
        setTabNumber(newValue);
    };

    const classes = useStyles();
    return (
        <Grid container spacing={1} >
            <AppBar position="static" style={{ background: '0c0a8c', marginTop: '10px' }}>
                <Tabs value={tabNumber} onChange={handleChange} className={classes.tabs} centered>
                    <Tab label="Wyszukiwanie podstawowe" 
                        {...PropsGenerator(0)} 
                        classes={{ root: classes.root }}/>
                    <Tab label="Wyszukiwanie zaawansowane" 
                        {...PropsGenerator(1)} 
                        className={{ root: classes.root }}/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabNumber} index={0} style={{ width: 'inherit'}}>
                <BasicSearch />
            </TabPanel>
            <TabPanel value={tabNumber} index={1}  style={{ width: 'inherit'}}>
                <AdvancedSearch />
            </TabPanel>
        </Grid>
    )
}

const useStyles = createUseStyles({
    root: {
        width: 200,
        backGrounColor: '#000'
    },
    paper: {
        padding: 10,
        height: 700,
        marginLeft: 10
    },
    tabs: {
        borderBottom: `1px solid #000`,
        width: 'inherit !important'
    },
});

export default CatalogPage