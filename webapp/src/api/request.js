const API_URL = 'http://localhost:8080';

const request = async (route, method = 'GET', body = undefined) => {
  const res = await fetch(`${API_URL}${route}`, {
    method,
    headers: {
      'Content-Type': body === undefined ? undefined : 'application/json',
    },
    body: JSON.stringify(body),
  });
  const resBody = await res.json();

  return resBody;
};

export default request;
