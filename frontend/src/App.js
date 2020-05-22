import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LayoutContainer from './ui/layout/LayoutContainer';
import LandingPageContainer from './ui/pages/LandingPageContainer'
import ThesisPageContainer from './ui/pages/ThesisPageContainer'

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <LayoutContainer>
          <Switch>
            <Route exact path="/" component={LandingPageContainer} />
            <Route path="/thesis/:thesisId" component={ThesisPageContainer} />
          </Switch>
      </LayoutContainer>
    </Router>
  );
}

export default App;
