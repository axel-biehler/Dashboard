import { getToken } from './auth';

const AuthorizationPrefix = 'Bearer ';
const API_URL = 'http://localhost:8080';

const request = async (route, method = 'GET', body = undefined) => {
  const token = getToken();
  const res = await fetch(`${API_URL}${route}`, {
    method,
    headers: {
      'Content-Type': body !== undefined ? 'application/json' : undefined,
      Authorization: token != null ? `${AuthorizationPrefix}${token}` : undefined,
    },
    body: JSON.stringify(body),
  });
  const resBody = await res.json();

  return resBody;
};

export default request;
