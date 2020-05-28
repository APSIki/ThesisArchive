import React from 'react';
import { createUseStyles } from 'react-jss';
import { Paper, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddThesisComponent = ({ triggerText, buttonRef, showModal }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} xl={12}>
        <Paper className={classes.paper}>
            <IconButton onClick={showModal} ref={buttonRef}>
                <AddIcon />
                <p>{triggerText}</p>
            </IconButton>
        </Paper>
    </Grid>
    );
}

const useStyles = createUseStyles({
    paper: {
      padding: 10,
      paddingTop: 2,
      maxWidth: 300,
      backgroundColor: "#cccccc"
    }
});

export default AddThesisComponent