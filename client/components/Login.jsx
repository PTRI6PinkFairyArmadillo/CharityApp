import React, { Component, useState } from 'react';
import signInImg from '../assets/Yogi.jpg';
import Cookies from 'universal-cookie';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            plainPassword: ''
        }
    this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        const cookies = new Cookies()
        fetch('/loginSignUp/logIn', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                plainPassword: this.state.plainPassword
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
          cookies.set('jwt', res.accessToken)
        })
        .catch(err => console.log('handleLogin: ERROR: ',err))
    }

    onLoginClick(e) {
      this.handleLogin(e);
      this.props.login(e);
    }
    
    render() {

        return (
            <div>
              <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                  <div className="image">
                    <img src={signInImg} />
                  </div>
                  <div className="form">
                    <div className="form-group">
                      <input onChange={(e) => this.setState({ username: e.target.value })} e="text" name="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                      <input onChange={(e) => this.setState({ plainPassword: e.target.value })} type="password" name="password" placeholder="password" />
                    </div>
                  </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={(e) => this.onLoginClick(e)}>Login</button>
                </div>
              </div>
            </div>
        );
        }
    }

    export default Login;