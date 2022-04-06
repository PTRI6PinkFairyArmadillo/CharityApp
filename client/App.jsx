import React, { Component } from 'react';
import { Signup, Login, Bank } from './components/index';
import PublicRoutes from './components/PublicRoutes';
import PrivateRoutes from './components/PrivateRoutes';
import Cookies from 'universal-cookie';
import Dashboard from './containers/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    const cookies = new Cookies()
    if (cookies.get('jwt')) {
      this.setState({
        loggedIn: true
      })
    }
  }
  
  login = (e) => {
    this.setState({
      loggedIn: true
    })
    console.log('logged in');
  }

  logout = (e) => {
    const cookies = new Cookies()
    cookies.remove('jwt')
    this.setState({
      loggedIn: false
    })
    console.log('logged out');
  }
  

  render() {
    
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoutes loggedIn={this.state.loggedIn} />}>
            <Route exact path='/' element={<Login login={this.login} loggedIn={this.state.loggedIn} />} />
          </Route>
          <Route path='/Dashboard' element={<PrivateRoutes logout={this.logout} loggedIn={this.state.loggedIn} />}>
            <Route exact path='/Dashboard' element={<Dashboard logout={this.logout}/>}/>
          </Route>
        </Routes>
      </BrowserRouter >
    );
  }
}

export default App;