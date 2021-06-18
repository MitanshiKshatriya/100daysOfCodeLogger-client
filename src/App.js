import React from 'react';
import { Provider } from 'react-redux';
import store from './store'

import Navigation from './components/Navigation';
import LogList from './components/LogList';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


function App() {
  return (
   <Provider store={store}> 
    <div className="App">
<Navigation/>
<LogList/>
    </div>
    </Provider>

  );
}

export default App;
