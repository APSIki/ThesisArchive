import React, { useEffect, useState, useRef } from 'react';
import { Paper } from '@material-ui/core';
import { createUseStyles } from 'react-jss';

const CatalogPage = () => {

    const classes = useStyles();
    return (
        <React.Fragment>
            <Paper variant="outlined" elevation={3} className={classes.paper}>
                <div>Wyszukiwanie prac</div>
            </Paper>
            
        </React.Fragment>
    )
}

const useStyles = createUseStyles({
    paper: {
        padding: 10,
        height: 700,
        marginLeft: 10
      } 
});

export default CatalogPage