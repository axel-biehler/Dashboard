const jsonwebtoken = require('jsonwebtoken');

const LOCAL_TOKEN_KEY = 'jwt';
const LOCAL_USERNAME_KEY = 'username';

const setToken = (token) => {
  const decoded = jsonwebtoken.decode(token);
  localStorage.setItem(LOCAL_TOKEN_KEY, token);
  localStorage.setItem(LOCAL_USERNAME_KEY, decoded.username);
};

const clearToken = () => {
  localStorage.clear(LOCAL_TOKEN_KEY);
  localStorage.clear(LOCAL_USERNAME_KEY);
};

const updateUsername = (newUsername) => localStorage.setItem(LOCAL_USERNAME_KEY, newUsername);

const getToken = () => localStorage.getItem(LOCAL_TOKEN_KEY);

const getUsername = () => localStorage.getItem(LOCAL_USERNAME_KEY);

export {
  setToken,
  clearToken,
  getToken,
  getUsername,
  updateUsername,
};
