import React from 'react';
import { FlightSearch } from './view';
import store from './store';
import { Provider } from 'react-redux';
import { theme } from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <FlightSearch />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
