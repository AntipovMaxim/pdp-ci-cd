import 'whatwg-fetch';
import { UserStorage } from '../services/storages/UserStorage';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options = {}) {
  const token = UserStorage.getAuthorization();
  return fetch(url, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${UserStorage.getAuthorization()}` } : {}),
    },
    ...options,
  })
    .then(checkStatus)
    .then(parseJSON);
}
