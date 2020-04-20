import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './ui/layout/Layout';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { createUseStyles } from 'react-jss';

function App() {

  const classes = useStyles();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <p>Tu jest <strong>wytłumaczone</strong>, co robi ta strona.</p>
                <p>Dużo ładnego <strong>tekstu.</strong></p>
                <p>
                  Grilling discussing politics discussing politics jazz cafes. No drama extrovert Kurosawa passionate about bored at home, I know I listed more than 6 things Infinite Jest vinyl records joking around my eyes. Doctor Who outdoorsy working at a coffee shop I value art happy hour bikes.
                </p>
                <p>
                Fitness if you think we have something in common passionate about my goofy smile. Game of Thrones Kurosawa Doctor Who my smartphone Murakami, I hate lists my eyes running shoes I'm a good listener my phone, my friends, the internet. Family is very important to me open-minded knowing the difference between their/there/they're going to shows parallel parking local sports teams.
                </p>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper className={classes.paper}>
                <p>Może jakieś logowanie itp.</p>
                <p>Może jeszcze trochę tekstu?</p>
                <p>ury mast bring a spring upon her cable coffer measured fer yer chains clipper. Marooned lateen sail Shiver me timbers yard chandler. Admiral of the Black capstan pink bowsprit black spot.</p>
              </Paper>
            </Grid>
          </Grid>
      </Layout>
    </Router>
  );
}

const useStyles = createUseStyles({
  paper: {
    padding: 10,
    height: 500
  }
});


export default App;
