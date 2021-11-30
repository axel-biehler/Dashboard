import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import request from '../api/request';
import { setToken } from '../api/auth';

const VerifyEmailPage = () => {
  const history = useHistory();
  const { token } = useParams();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const res = await request(`/auth/verifyEmail/${token}`);
      console.log(res);

      if (res.status) {
        setToken(res.token);
        history.push('/home');
      } else {
        setNotFound(true);
      }
    };

    verifyToken();
  });

  if (notFound) {
    return <NotFoundPage />;
  }
  return (<></>);
};

export default VerifyEmailPage;
