import React from 'react';
import { FlightPage } from './view';
import store from './store';
import { Provider } from 'react-redux';
import { theme } from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';

const hist = createBrowserHistory();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={hist}>
          <Switch>
            <Route path={"/"} component={FlightPage} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
