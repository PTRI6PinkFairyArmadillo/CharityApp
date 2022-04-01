import React, { Component } from 'react';
import Dashboard from '../containers/Dashboard.js'

class Login extends Component {
    render(){
        return(
            <div>
                <h1>Login component</h1>
                <Dashboard />
            </div>
        )
    }
}

export default Login;