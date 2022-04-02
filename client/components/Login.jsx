import React, { Component, useState } from 'react';
import Dashboard from '../containers/Dashboard.js'
import signInImg from '../assets/Yogi.jpg'



export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        
    this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        fetch('/loginSignUp/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            // console.log('login res',res)
          return this.setState({
            loggedIn: true,
            username: '',
            password: ''
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
                    <input onChange={(e) => this.setState({ password: e.target.value })} type="password" name="password" placeholder="password" />
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