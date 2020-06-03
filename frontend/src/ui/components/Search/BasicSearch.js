import React from 'react';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { createUseStyles } from 'react-jss';

const BasicSearch = (props) => {

    const classes = useStyles();


    const handleUserInput = (event) => {
        props.onChangeMethod(event);
    }

    return (
        <div className={classes.searchForm}>
            <input className={classes.searchBox} placeholder="Search for..." value={props.query} onChange={handleUserInput} />
            <IconButton onClick={props.onClickMethod}>
                <SearchIcon />
            </IconButton>
        </div>
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