import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';


const PlaidApp = (props) => {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [itemId, setItemId] = useState(null);

  const generateToken = () => {
    fetch('/plaid/create_link_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setLinkToken(data.link_token))
  };

  useEffect(() => {
    generateToken();
  }, []);

  const handleAuth = () => {
    console.log('Auth End Point');
    fetch('/plaid/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        props.updated ? props.setUpdated(false) : props.setUpdated(true);
      })
      .catch(err => console.log(err))
  };

  const handleTransaction = () => {
    console.log('Transaction End Point');
    fetch('/plaid/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  };

  const handleId = () => {
    console.log('Id End Point');
    fetch('/plaid/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  };

  const handleBalance = () => {
    console.log('Balance End Point');
    fetch('/plaid/balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  };

  const handleGetBank = () => {
    fetch('plaid/banks')
      .then(res => res.json())
      .then(data => console.log(data))
  };

  const handleDeleteBank = () => {
    fetch('/banks/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => console.log(data))
  };

  return (
    <div>
      {
        linkToken ?
          <Link
            linkToken={linkToken}
            accessToken={accessToken}
            itemId={itemId}
            setAccessToken={setAccessToken}
            setItemId={setItemId}
            handleAuth={handleAuth}
          />
          :
          <>No Public Token</>
      }
      {
        linkToken && accessToken ?
          <div>
            <button className='buttonNav' onClick={handleAuth}>Connect Banks</button>
            {/* <button onClick={handleTransaction}>Get Transaction</button>
            <button onClick={handleBalance}>Get Balance</button>
            <button onClick={handleGetBank}>Get Banks</button>
            <button onClick={handleDeleteBank}>Delete Banks</button> */}
          </div>
          :
          <></>
      }
    </div>
  );
};

const Link = (props) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    fetch('/plaid/exchange_public_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    })
      .then(res => res.json())
      .then(data => {
        props.setItemId(data.itemId);
        props.setAccessToken(data.accessToken);
      })
  }, []);

  const config = {
    token: props.linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <button className='buttonNav' onClick={() => open()} disabled={!ready}>
      Login with Plaid
    </button>
  );
};

export default PlaidApp;