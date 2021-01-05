import axios from 'axios';
const environment = process.env.ENV || 'development';
console.log('env', environment);

const ApiUrl =
  environment !== 'development'
    ? 'https://family-pomise-spokane.herokuapp.com'
    : 'http://localhost:8000/';

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'))?.idToken
    ?.value;
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: 'https://family-pomise-spokane.herokuapp.com',
  });
};
