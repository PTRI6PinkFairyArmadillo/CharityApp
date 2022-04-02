import React, { Component, useState } from 'react';
import Dashboard from '../containers/Dashboard.js'
import signInImg from '../assets/Yogi.jpg'



export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            plainPassword: '',
        }
        
    this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        fetch('/loginSignUp/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                plainPassword: this.state.plainPassword
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            console.log('login response all userInfo',res)
          return this.setState({
            loggedIn: true,
            username: '',
            plainPassword: ''
          })
        })
        .catch(err => console.log('handleLogin: ERROR: ',err))
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                <img src={signInImg} />
                </div>
                <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => this.setState({ username: e.target.value })} e="text" name="username" placeholder="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => this.setState({ plainPassword: e.target.value })} type="password" name="password" placeholder="password" />
                </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={(e) => this.handleLogin(e)}>
                Login
                </button>
            </div>
            </div>
        );
        }
    }