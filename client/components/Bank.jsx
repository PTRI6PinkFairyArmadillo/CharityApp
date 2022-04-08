import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import './bank.css';
import { useNavigate } from 'react-router-dom';
import PlaidLink from './PlaidLink'


const Bank = (props) => {
  const [bankInfo, setBankInfo] = useState(null);
  let navigate = useNavigate();

  const backToDashboard = (e) => {
    e.preventDefault();
    navigate('/dashboard')
  }

  useEffect(async () => {
    const res = await fetch('/banks');
    const data = await res.json();
    console.log(data);
    setBankInfo(...data);
    console.log(bankInfo);
    // fetch('/banks')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('data ', data);
    //     setBankInfo(...data);
    //   })
    //   .then(console.log('bankInfo ', bankInfo))
  }, []);

  const [charities, setCharities] = useState([]);
  
  //make fetch request to pull charities data from db
    useEffect (() => {
      fetch('/banks')
      .then(response => response.json())
      .then(data => {
        setBankInfo(...data);
        });
          },[]);


  let banks;

  useEffect(() => {
    if (bankInfo) {
      banks = bankInfo.map(el => {
        <Collapsible trigger={`${el.bank_name}`}>
          <div className="pTag">
            <h4>{el.official_name}</h4>
            <div>
              <h4 className="accNumber">Account number:</h4> <p className="accNumber">{el.account_number}</p>
            </div>
            <br></br>
            <button className="buttonNav">donate</button>
          </div>
        </Collapsible>
      });
    }
  }, [bankInfo]);

  return (
    <div className='backtoDashboard' >

      <button onClick={backToDashboard} className="buttonNav">dashboard</button>
      <PlaidLink></PlaidLink>
      {banks}
    </div>
  )
}


export default Bank;