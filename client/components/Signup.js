import React, { Component } from 'react';
import Login from './Login.js'

class Signup extends Component {
    render(){
        return(
            <div>
                <h1>Signup with Login child component</h1>
                <Login />
            </div>
        )
    }
}

export default Signup;