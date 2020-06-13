import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LayoutContainer from './ui/layout/LayoutContainer';
import ThesesPageContainer from './ui/pages/ThesesPageContainer'
import ThesisPageContainer from './ui/pages/ThesisPageContainer'
import CatalogPageContainer from './ui/pages/CatalogPageContainer';
import DashboardPageContainer from './ui/pages/DashboardPageContainer';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment'

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <LayoutContainer>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Switch>
            <Route exact path="/" component={DashboardPageContainer} />
            <Route exact path="/theses" component={ThesesPageContainer} />
            <Route path="/thesis/:thesisId" component={ThesisPageContainer} />
            <Route path="/catalog" component={CatalogPageContainer} />
          </Switch>
        </MuiPickersUtilsProvider>
      </LayoutContainer>
    </Router>
  );
}

export default App;
