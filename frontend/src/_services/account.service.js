import { BehaviorSubject } from 'rxjs';

import { history } from '_helpers';

import API from '_helpers/api-helpers';
import setAuthToken from '_helpers/setAuthToken';

export const baseUrl = `${process.env.REACT_APP_API_URL}`;
const accountSubject = new BehaviorSubject(null);

export const accountService = {
  login,
  apiAuthenticate,
  logout,
  createPost,
  account: accountSubject.asObservable(),
  get accountValue() {
    return accountSubject.value;
  },
};

async function login() {
  // login with facebook then authenticate with the API to get a JWT auth cookie
  await window.FB.login(
    function (response) {
      if (response.status === 'connected') {
        apiAuthenticate(response.authResponse.accessToken)
          .then((data) => {
            const { from } = history.location.state || {
              from: { pathname: '/' },
            };
            history.push(from);
          })
          .catch((err) => console.error(err));
      }
    },
    { scope: 'public_profile,email' }
  );
}

async function apiAuthenticate(accessToken) {
  // authenticate with the api using a facebook access token,
  // on success the api returns an account object with a JWT auth token
  try {
    const response = await API.post(
      `${baseUrl}/sessions`,
      { accessToken },
      { headers: { 'Content-Type': 'Application/json' } }
    );
    const account = response.data.user;
    accountSubject.next(account);
    setAuthToken(account.token);
    return account;
  } catch (err) {
    console.error(err);
  }
}

async function logout() {
  try {
    await API.put(`${baseUrl}/users/${accountSubject.value?.id}`, {
      token: null,
    });
    await window.FB.logout();
    setAuthToken();
    accountSubject.next(null);
    history.push('/');
  } catch (err) {
    console.error(err);
  }
}

async function createPost() {
  return API.post(`/posts`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}
