import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import WS from '../../tools/WS';
import Theses from '../components/Catalog/Theses'

const CatalogPage = () => {

    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState([]);


    const getData = () => {
        WS.getThesisBySearch().then(response => {
            console.log(response);
            setFilteredData(response.data.theses);
        })
    }

    const handleInputChange = event => {
        const query = event.target.value;
        setQuery(query);
      };

    const classes = useStyles();
    return (
        <React.Fragment>
            <Paper variant="outlined" elevation={3} className={classes.paper}>
                <div>Wyszukiwanie prac</div>
                <div className={classes.searchForm}>
                    <input className={classes.searchBox} placeholder="Search for..." value={query} onChange={handleInputChange} />
                    <button className={classes.searchButton} onClick={getData} >Wyszukaj!</button>
                </div>
                {
                filteredData != null ? <Theses theses={filteredData} /> : null 
                }
            </Paper>

        </React.Fragment>
    )
}

const useStyles = createUseStyles({
    paper: {
        padding: 10,
        height: 700,
        marginLeft: 10
    },
    searchForm: {
        marginTop: 10,
        marginBottom: 20
    },
    searchButton: {
        "background": "#7f5c8c",
        "border-radius": "5px"
    },
    searchBox: {
        border: "1px solid #7f5c8c",
        width: "300px",
        "border-radius": "5px",
        "&:focus": {
            "outline-color": "#7f5c8c"
        }
    }
});

export default CatalogPage