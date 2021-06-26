import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import store from './store'
import { loadUser } from './actions/authActions';

import Navigation from './components/Navigation';
// import LogList from './components/LogList';
// import LogGrid from './components/LogGrid';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';
import NotesList from './components/notes/NotesList';
import PrivateRoute from './utils/PrivateRoute'
import Profile from './components/Profile';
import Resources from './components/Resources';


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
    <Route exact path='/' component={Home} />
    <Route exact path='/resources' component={Resources} />
    {/* <Route exact path='/loglist' component={LogList} />
    <Route exact path='/loggrid' component={LogGrid} /> */}
    <PrivateRoute exact path='/loglist' component={NotesList} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <PrivateRoute path='/profile' component={Profile}/>
</Switch>
{/* <LogList/> */}
    </div>
    </Provider>

  );
  }
}

export default App;
