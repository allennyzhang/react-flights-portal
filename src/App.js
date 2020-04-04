import React from 'react';
import { FlightPage } from './view';
import store from './store';
import { Provider } from 'react-redux';
import { theme } from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <FlightPage />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
