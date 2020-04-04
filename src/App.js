import React from 'react';
import './App.css';
import { FlightSearch } from './view';
import store from './store';
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <FlightSearch />
        </header>
      </div>
    </Provider>
  );
}

export default App;
