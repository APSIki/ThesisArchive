import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './ui/layout/Layout';
import { createUseStyles } from 'react-jss';
import LandingPageContainer from './ui/pages/LandingPageContainer'
import ThesisPageContainer from './ui/pages/ThesisPageContainer'

function App() {

  const classes = useStyles();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
          <Switch>
            <Route exact path="/" component={LandingPageContainer} />
            <Route path="/thesis/:thesisId" component={ThesisPageContainer} />
          </Switch>
      </Layout>
    </Router>
  );
}

const useStyles = createUseStyles({
  
});


export default App;
