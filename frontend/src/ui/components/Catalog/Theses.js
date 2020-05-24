import React from 'react';
import { Grid} from '@material-ui/core';
import SingleThesis from './SingleThesis';
import { createUseStyles } from 'react-jss';


const MyTheses = props => { 
  const classes = useStyles();  
  return (
    <div className={classes.root}>
        { props.theses.length > 3 ?
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    {props.theses.slice(0,4).map((thesis, id) => (
                        <Grid item xs={3}>
                            <SingleThesis 
                            thesis={thesis}
                            key={id} />
                        </Grid>
                    ))} 
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    {props.theses.slice(4,8).map((thesis, id) => (
                        <Grid item xs={3}>
                            <SingleThesis 
                            thesis={thesis}
                            key={id} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </React.Fragment>:
        <Grid container spacing={1} direction="column">
            {props.theses.map((thesis, id) => (
            <SingleThesis 
            thesis={thesis}
            key={id} />
            ))}
        </Grid>}
    </div>
  );
}

const useStyles = createUseStyles({
    root: {
      flexGrow: 1,
    }
});

export default MyTheses;