import React, { Component } from 'react';
import signInImg from '../assets/Yogi.jpg'

export class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fName: '',
        lName: '',
        username: '',
        plainPassword: ''
      }

      this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(e) {
      fetch('/loginSignUp/signup', {
          method: 'POST',
          body: JSON.stringify({
              username: this.state.username,
              fName: this.state.fName,
              lName: this.state.lName,
              plainPassword: this.state.plainPassword
          }),
          headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        console.log('response object',res)
        return this.setState({
          loggedIn: true,
          username: '',
          fName: '',
          lName: '',
          password: ''
        })
      })
      .catch(err => console.log('handleSignup: ERROR',err))
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={signInImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={(e) => this.setState({username: e.target.value})} type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Name</label>
              <input onChange={(e) => this.setState({fName: e.target.value})} type="text" name="firstName" placeholder="firstName" />
              <input onChange={(e) => this.setState({lName: e.target.value})} type="text" name="lastName" placeholder="lastName" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={(e) => this.setState({plainPassword: e.target.value})} type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={(e) => this.handleSignup(e)}>
            Register
          </button>
        </div>
      </div>
    );
  }
}