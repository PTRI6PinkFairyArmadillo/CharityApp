import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//props needed: sourceAccount (from banks page)

const Charities = (props) => {
  let navigate = useNavigate();

  //call to load charity data from API to db
  fetch('/charityAPI/load', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  })  
    // .then(data => console.log(data))
    .catch(err => console.log('error in Charities.jsx fetch', err))

  //state hook for sourceAccount, used if we navigate back to account page
  const [sourceAccount, deleteSourceAccount] = useState(props.sourceAccount);
  const [charities, setCharities] = useState([]);
  
  
  //navigate back to banks page
  const backToAccounts = (e) => {
    e.preventDefault();
    navigate('/dashboard/banks');
    deleteSourceAccount(null);
  }
  
  //cancel option
  const backToDashboard = (e) => {
    //need to remove existing donation workflow state (ie 'source-bank-account')

    e.preventDefault();
    navigate('/dashboard');
    deleteSourceAccount(null);
  }


  //make fetch request to pull charities data from db
  useEffect (() => {
    console.log('STARTING FETCH FROM DB')
    fetch('/charityAPI/getFromDB')
    .then(response => response.json())
    .then(data => setCharities(data))  
  });  

//   console.log(`AFTER GET, CHARITIES: ${JSON.stringify(charities)}`)

  // creating the table of charities
  const routeChange = () =>{ 
    let path = `localhost:8080`; 
    navigate(path);
  }
    
  function Rows(){
    return (
      charities.map((k,i) => {
        let charity = charities[i];
        console.log('CHARITY',charity);
        return (
          <tr key={i} className='table--charityRow'>
            <td>{k}</td>
            <td>{charity.name}</td>
            <td>{charity.city}</td>
            <td>{charity.country}</td>
            <td>{charity.mission}</td>
            <td className="table--link">
              Link: {charity.url}
            </td>
            <td>{charity.ein}</td>
            <td>
              <button type='submit' className="table--charitySaveButton" onClick={() => {routeChange}}>Donate!</button>
            </td>
          </tr>
        )
      })
    );
  }
  const header = ['name','city','country','url','mission','ein'];
  return (
      <div>
        <table className='charities--table'>
            <thead>
                <tr>{header.map((e,i) => <th key={i}>{e}</th>)}</tr>
            </thead>
            <tbody>
                {Rows()}
            </tbody>
        </table>
        <div>
            <button onClick={() => backToAccounts(e)}>Back to Accounts</button>
        </div>
      </div>
  )
  
  
}


export default Charities;