import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const APIHelpers = {
  authorizationHeaders: (auth_token = '') => ({
    Authorization: auth_token,
    'Content-Type': 'application/json',
  }),
  projectImagePath: () => 'files',
};
