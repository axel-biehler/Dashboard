import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getToken } from '../api/auth';

const IndexPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (getToken() != null) {
      history.push('/home');
    } else {
      history.push('/login');
    }
  }, []);

  return <div />;
};

export default IndexPage;
