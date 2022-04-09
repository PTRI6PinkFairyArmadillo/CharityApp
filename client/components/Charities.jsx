import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Collapsible from 'react-collapsible';
//props needed: sourceAccount (from banks page)

const Charities = (props) => {
  let navigate = useNavigate();

  
  //state hook for charity data pulled from db in useEffect
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(false)
  
  //make fetch request to pull charities data from db
    useEffect (() => {
      fetch('/charityAPI/getFromDB')
      .then(response => response.json())
      .then(data => {
          setCharities(data);
          console.log('here',charities);
          if(!data.length) {
              // //call to load charity data from API to db
              fetch('/charityAPI/load', {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  setLoading(true)
                })
                .catch(err => console.log('error in Charities.jsx fetch', err))
            }
        });
          },[loading]);
        
    //state hook for sourceAccount, used if we navigate back to account page
    const [sourceAccount, deleteSourceAccount] = useState(props.sourceAccount);

  
  function Rows(){
    return (
      charities.map((k,i) => {
        let charity = charities[i];
        return (
          <Collapsible key={i} trigger={`${charity.name}`}>
          <div className="pTag">
            <h4>{charity.mission}</h4>
            <div>
            <p className="accNumber">Name:</p><h4 className="accNumberCharity">{charity.name}</h4> 
            <p className="accNumber">City:</p><h4 className="accNumberCharity">{charity.city}</h4> 
            <p className="accNumber">Country:</p><h4 className="accNumberCharity">{charity.country}</h4> 
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <h4 className="accNumberCharity">Please choose donate amount</h4>
            <input style={{border: '1px solid white', borderRadius: '7px'}} type='text'></input>
            <br></br>
            <button className="buttonNavBank" onClick={(e) => {
              e.preventDefault()
              alert('Thank you for your donation!')
              window.location.href = '/dashboard'
            }}>Donate</button>
          </div>
        </Collapsible>

        )
      })
    );
  }
  const header = [' '];
  return (
      <div>
        <div className='bankNav'>
        <button className="buttonNavBank" onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard/banks');
                  deleteSourceAccount(null);
            }}>Back to Accounts</button>
        </div>
        <div>
        <table className='charities--table'>
            <thead>
                <tr>{header.map((e,i) => <th key={i}>{e}</th>)}</tr>
            </thead>
            <tbody className='charities'>
                {Rows()}
            </tbody>
        </table>
        </div>
        <div>
            
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
      </div>
  )
}


export default Charities;