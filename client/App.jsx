import React, { Component } from 'react';
import { Signup, Login} from './components/index';
import Bank from './components/Bank';
import PublicRoutes from './components/PublicRoutes';
import PrivateRoutes from './components/PrivateRoutes';
import Cookies from 'universal-cookie';
import Dashboard from './containers/Dashboard';
import PlaidApp from './components/PlaidLink';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
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
      <PlaidApp></PlaidApp>
        <Routes>
          <Route path='/' element={<PublicRoutes loggedIn={this.state.loggedIn} />}>
            <Route exact path='/' element={<Login login={this.login} loggedIn={this.state.loggedIn} />} />
          </Route>
          <Route path='/dashboard' element={<PrivateRoutes logout={this.logout} loggedIn={this.state.loggedIn} />}>
            <Route exact path='/dashboard/banks' element={<Bank />}/>
            <Route exact path='/dashboard' element={<Dashboard logout={this.logout}/>}/>
          </Route>
        </Routes>
      </BrowserRouter >
    );
  }
}

export default App;