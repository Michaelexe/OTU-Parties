import axios from 'axios';

const baseURL = 'http://10.0.2.2:5000/api';

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const Auth = {
  register: registerData => instance.post('/auth/user/register/', registerData),
};

export default {Auth};
