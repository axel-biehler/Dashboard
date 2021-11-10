import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clearToken } from '../api/auth';

const LogoutPage = () => {
  const history = useHistory();

  useEffect(() => {
    clearToken();
    history.push('/login');
  }, []);

  return <div />;
};

export default LogoutPage;
