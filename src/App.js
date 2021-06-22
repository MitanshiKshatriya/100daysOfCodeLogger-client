import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import store from './store'
import { loadUser } from './actions/authActions';

import Navigation from './components/Navigation';
import LogList from './components/LogList';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';


class App extends Component {

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, [])
  componentDidMount(){
    store.dispatch(loadUser());
  }
  
  render(){
  return (
   <Provider store={store}> 
    <div className="App">
<Navigation/>
<Switch>
    <Route exact path='/' component={LogList} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
</Switch>
{/* <LogList/> */}
    </div>
    </Provider>

  );
  }
}

export default App;
