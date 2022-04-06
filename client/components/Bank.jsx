import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import './bank.css';

export class Bank extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
render() {

    return (
<div>
<Collapsible trigger="Bofa 2748">
                <div className="pTag">
                    <h3>Bank of America</h3>
                    <div>
                    <h4 className="accNumber">Account number:</h4> <p className="accNumber">263759302632748</p>
                    </div>
                    <br></br>
                    <button className="button updateButton">update</button>
                    <button className="button deleteButton">delete</button>
                </div>
                </Collapsible>
                <Collapsible trigger="Amex 2472">
                <div className="pTag">
                    <h3>American Express</h3>
                    <div>
                    <h4 className="accNumber">Account number:</h4> <p className="accNumber">263759302632472</p>
                    </div>
                    <br></br>
                    <button className="button updateButton">update</button>
                    <button className="button deleteButton">delete</button>
                </div>
                </Collapsible>
                <Collapsible trigger="Chase 2201">
                <div className="pTag">
                    <h3>Chase Banking</h3>
                    <div>
                    <h4 className="accNumber">Account number:</h4> <p className="accNumber">263759302632201</p>
                    </div>
                    <br></br>
                    <button className="button updateButton">update</button>
                    <button className="button deleteButton">delete</button>
                </div>
                </Collapsible>
            </div>
        )
    }   
}