import axios from 'axios';

axios.interceptors.request.use((config) => {
  const user = () => window.localStorage.getItem('user');

  if ( user ) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

}, (error) => {
  return Promise.reject(error);
});

export default axios;
