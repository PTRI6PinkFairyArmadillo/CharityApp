import React, { Component } from 'react';
import { Signup, Login } from './components/index';
// import Signup from './components/Signup';
// import Login from './components/Login';
import Dashboard from './containers/Dashboard';
import PlaidApp from './components/PlaidLink';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './styles/app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      loggedIn: false,
      token: null,
    };
  }

  componentDidMount() {
    //Add .right by default

    // this.rightSide.classList.add("right");

    //if loggedIn, render/fetch Dashboard

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

  render() {
    // const { isLogginActive } = this.state;
    // const current = isLogginActive ? "Signup" : "Login";
    // const currentActive = isLogginActive ? "login" : "register";
    // if (!this.state.token) {
    //   return (
    //     <div>
    //       <Login setToken={this.setToken} />
    //       <PlaidApp></PlaidApp>
    //     </div>

    //   )
    // }
    return (
      <BrowserRouter>
      <PlaidApp></PlaidApp>
        <Routes>
          {/* <Route
            exact
            path='/'
            element={<Signup />}
          />
          <Route
            exact
            path='/logIn'
            element={<Login />}
          /> */}
          {/* <Route
            exact
            path='/'
            element={<Dashboard />}
          /> */}
        </Routes>
      </BrowserRouter>



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