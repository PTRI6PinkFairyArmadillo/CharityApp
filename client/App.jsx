import React, { Component } from 'react';
import { Signup, Login, Bank } from './components/index';
import Cookies from 'universal-cookie';
import Dashboard from './containers/Dashboard';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './styles/app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLogginActive: true,
      loggedIn: false,
      token: null,
    };
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    const cookies = new Cookies()
    if (cookies.get('jwt')) {
      this.setState({loggedIn: true})
    }
  }

  // changeState() {
  //   const { isLogginActive } = this.state;

  //   if (isLogginActive) {
  //     this.rightSide.classList.remove("right");
  //     this.rightSide.classList.add("left");
  //   } else {
  //     this.rightSide.classList.remove("left");
  //     this.rightSide.classList.add("right");
  //   }
  //   this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  // }
  setToken = (token) => {
    this.setState({
      token: token,
    })
  }

  logout = (e) => {
    const cookies = new Cookies()
    cookies.remove('jwt')
    this.setState({
      loggedIn: false
    })
    window.location.href = "/logIn"
    console.log('signout clicked');
  }
  

  render() {
    // const { isLogginActive } = this.state;
    // const current = isLogginActive ? "Signup" : "Login";
    // const currentActive = isLogginActive ? "login" : "register";
    // if (!this.state.token) {
    //   return <Login setToken={this.setToken} />
    // }
    let token = this.state.token
    
  
    return (
      <BrowserRouter>
        {/* {(!this.state.loggedIn) ? <Navigate to={'/logIn'} /> : <Navigate to={'/dash'} />} */}
        <Routes>
          <Route
            exact path='/login'
            element={<Login loggedIn={this.state.loggedIn}/>}
          />
          <Route
            exact path='/dash'
            element={<Dashboard loggedIn={this.state.loggedIn} logout={this.logout}/>}
          />
           <Route
            exact path='/banks'
            element={<Bank />}
          />
        </Routes>
      
        
      </BrowserRouter >



      // <div className="App">
      //     <div className="login">
      //       <div className="container" ref={ref => (this.container = ref)}>
      //         {isLogginActive && (
      //           <Login containerRef={ref => (this.current = ref)}/>
      //         )}
      //         {!isLogginActive && (
      //           <Signup containerRef={ref => (this.current = ref)}/>
      //         )}
      //       </div>
      //       <RightSide
      //         current={current}
      //         currentActive={currentActive}
      //         containerRef={ref => (this.rightSide = ref)}
      //         onClick={this.changeState.bind(this)}
      //       />
      //     </div>

      // </div>
    );
  }
}

// const RightSide = props => {
//   return (
//     <div
//       className="right-side"
//       ref={props.containerRef}
//       onClick={props.onClick}
//     >
//       <div className="inner-container">
//         <div className="text">{props.current}</div>
//       </div>
//     </div>
//   );
// };

export default App;