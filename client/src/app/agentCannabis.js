import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://api.otreeba.com/v1';
const API_KEY = 'd2ad76ca24c971c804e6b20fbe8c308ca1a91728'

const responseBody = res => res.body;

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).set({ 'API-Key': `${API_KEY}`, Accept: 'application/json' }).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).set({ 'API-Key': `${API_KEY}`, Accept: 'application/json' }).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).set({ 'API-Key': `${API_KEY}`, Accept: 'application/json' }).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).set({ 'API-Key': `${API_KEY}`, Accept: 'application/json' }).then(responseBody)
};  

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Strains = {
    all: () =>
    requests.get('/strains')
}

const Edibles = {
    all:() => 
    requests.get('/edibles')
}

export default {
    Edibles,
    Auth,
    Strains
  };