import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidApp = () => {
  const [linkToken, setLinkToken] = useState(null);
  
  const generateToken = () => {
    fetch('/plaid/create_link_token', {
      method: 'POST',
    })
    .then(res => res.json())
    .then(data => {
      setLinkToken(data.link_token);
      console.log('fetch works')
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <Link linkToken={linkToken} /> : <>nothing</>;
};

const Link = (props) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    const response = fetch('/api/set_access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
    // Handle response ...
  }, []);
  const config = {
    token: props.linkToken,
    receivedRedirectUri: window.location.href,
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