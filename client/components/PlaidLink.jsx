import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidApp = () => {
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
      .then(data => console.log(data))
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

  return (
    <div>
      {
        linkToken && !accessToken ?
          <Link
            linkToken={linkToken}
            accessToken={accessToken}
            itemId={itemId}
            setAccessToken={setAccessToken}
            setItemId={setItemId}
          />
          :
          <>No Public Token</>
      }
      {
        linkToken && accessToken ?
          <div>
            <button onClick={handleAuth}>Get Auth</button>
            <button onClick={handleTransaction}>Get Transaction</button>
            <button onClick={handleId}>Get Identity</button>
            <button onClick={handleBalance}>Get Balance</button>
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
        return
      })
  }, []);
  const config = {
    token: props.linkToken,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};

export default PlaidApp;