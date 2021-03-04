import axios from 'axios';
const environment = process.env.ENV || 'development';

const ApiUrl =
  environment === 'development'
    ? process.env.REACT_APP_API_LOCAL
    : process.env.REACT_APP_API_HEROKU;

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'))?.idToken
    ?.value;
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: ApiUrl,
  });
};
