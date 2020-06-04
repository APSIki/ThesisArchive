import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { createUseStyles } from 'react-jss';
import WS from '../../../tools/WS'
import DisplayTable from '../Catalog/DisplayTable'

const BasicSearch = (props) => {

    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [dataRows, setDataRows] = useState(null);

    const handleUserInput = event => {
        const query = event.target.value;
        setQuery(query);
        // if(query.length > 2){
        //     getData();
        // }
      };


    const handlebuttonSearchClick = () => {
        WS.getThesisByAdvancedSearch('all').then(response => {
            setDataRows(response.data.theses);
        })
    }

    return (
        <React.Fragment>
            <div className={classes.searchForm}>
                <input className={classes.searchBox} placeholder="Wpisz tytuł pracy..." value={query} onChange={handleUserInput} />
                <IconButton onClick={handlebuttonSearchClick}>
                    <SearchIcon />
                </IconButton>
            </div>
            { 
                dataRows != null ? <DisplayTable rows={dataRows} /> : null
            }
        </React.Fragment>

    )
}

const useStyles = createUseStyles({
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
        width: "500px",
        "border-radius": "5px",
        "&:focus": {
            "outline-color": "#7f5c8c"
        }
    }
});

export default BasicSearch