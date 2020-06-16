import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
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
      };


    const handlebuttonSearchClick = () => {
        WS.getThesesByBasicSearch(query).then(response => {
            setDataRows(response.data);

        })
    }

    return (
        <React.Fragment>
            <div className={classes.searchForm}>
                <input className={classes.searchBox} placeholder="tytuł, imiona i nazwiska autorów" value={query} onChange={handleUserInput} />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handlebuttonSearchClick}
                    endIcon={<SearchIcon />}>
                    Szukaj
                </Button>
                <p classes={classes.guideText}>Możesz wpisać fragment tytułu albo imiona i nazwiska autorów. <br/>
                By uzyskać więcej opcji skorzystaj z wyszukiwania zaawansowanego.</p>
            </div>
            { 
                dataRows != null ? <DisplayTable rows={dataRows} /> : null
            }
        </React.Fragment>

    )
}

const useStyles = createUseStyles({
    searchForm: {
        marginTop: 5,
        paddingTop: 5,
        marginBottom: 20,
        background: '#8b96d2',
        'text-align': 'center',
        border: '2px solid #3f51b5'
    },
    searchButton: {
        "border-radius": "5px"
    },
    searchBox: {
        border: "1px solid #7f5c8c",
        width: "700px",
        "border-radius": "5px",
        "&:focus": {
            "outline-color": "#7f5c8c"
        }
    },
    button: {
        height: '28px !important',
        border: 'none !important',
        '&:focus': {
           
        }
    },
    guideText: {
        color: 'grey'
    }
});

export default BasicSearch