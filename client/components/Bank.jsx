import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import './bank.css';
import { useNavigate } from 'react-router-dom';

const Bank = (props) => {

    let navigate = useNavigate();

    const backToDashboard = (e) => {
      e.preventDefault();
      navigate('/dashboard')
    }

    return (
      <div  className='backtoDashboard' >
        <button onClick={backToDashboard}  className="buttonNav">dashboard</button>
        <Collapsible trigger="Bofa 2748">
          <div className="pTag">
              <h3>Bank of America</h3>
              <div>
              <h4 className="accNumber">Account number:</h4> <p className="accNumber">263759302632748</p>
              </div>
              <br></br>
              <button className="buttonNav">donate</button>
          </div>
        </Collapsible>
        <Collapsible trigger="Amex 2472">
          <div className="pTag">
              <h3>American Express</h3>
              <div>
              <h4 className="accNumber">Account number:</h4> <p className="accNumber">263759302632472</p>
              </div>
              <br></br>
              <button className="button updateButton">donate</button>
          </div>
        </Collapsible>
        <Collapsible trigger="Chase 2201">
          <div className="pTag">
              <h3>Chase Banking</h3>
              <div>
              <h4 className="accNumber">Account number:</h4> <p className="accNumber">263759302632201</p>
              </div>
              <br></br>
              <button className="button updateButton">donate</button>
          </div>
        </Collapsible>
      </div>
    )
}   


export default Bank;