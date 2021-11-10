const LOCAL_KEY = 'jwt';

const setToken = (token) => {
  localStorage.setItem(LOCAL_KEY, token);
};

const clearToken = () => {
  localStorage.clear(LOCAL_KEY);
};

const getToken = () => {
  localStorage.getItem(LOCAL_KEY);
};

export {
  setToken,
  clearToken,
  getToken,
};
