import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import './bank.css';
import { useNavigate} from 'react-router-dom';
import PlaidLink from './PlaidLink'


const Bank = (props) => {
  const [bankInfo, setBankInfo] = useState([]);
  const [updated, setUpdated] = useState(false);
  let navigate = useNavigate();

  const backToDashboard = (e) => {
    e.preventDefault();
    navigate('/dashboard')
  }

  const toCharities = (e) => {
    e.preventDefault();
    navigate('/dashboard/charities');
  }

  //make fetch request to pull charities data from db
  useEffect(() => {
    console.log('fetch bank useEffect triggered');
    fetch('/banks')
      .then(response => response.json())
      .then(data => {
        setBankInfo(data);
      })
  }, [updated]);

  const handleDeleteBank = (row) => {
    fetch('/banks/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        updated ? setUpdated(false) : setUpdated(true);
      })
      .catch(error => console.log(error))
  };

  return (
    <div className='backtoDashboard' >
      <div className='bankNav'>
      <button onClick={backToDashboard} className="buttonNavBank">dashboard</button>
      <PlaidLink setUpdated={setUpdated}></PlaidLink>
      </div>
      <div className='banks'>
      {
        bankInfo.map((row) => (
          <Collapsible key={row._id} trigger={`${row.bank_name}`}>
            <div className="pTag">
              <h4>{row.official_name}</h4>
              <div>
                <h4 className="accNumber">Account number:</h4> <p className="accNumber">{row.account_number}</p>
              </div>
              <br></br>
              <button className="buttonNavBank" onClick={toCharities}>Donate</button>
              <button className='buttonNavBank' onClick={() => handleDeleteBank(row)}>Delete</button>
            </div>
          </Collapsible>
        ))
      }
      </div>
        <div className='footerBank'>
                <div className='box'>
                        <h3>Team Name: Pink Fairy Armadillo</h3>
                    </div>
                    <div className='box'>
                        <h3>Team:</h3>
                        <p>Sigele Nickerson-Adams</p>
                        <p>Javan Ang</p>
                        <p>Josh Merrell</p>
                        <p>Nathan Crawford</p>
                        <p>Milos Popovic</p>
                    </div>

                </div>
    </div>
  )
}


export default Bank;