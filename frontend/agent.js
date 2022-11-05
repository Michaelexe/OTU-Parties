import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://10.0.2.2:5000/api';

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('user_jwt');
    if (token) {
      config.headers.user_jwt = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const Auth = {
  register: registerData => instance.post('/auth/user/register/', registerData),
  login: loginData => instance.post('/auth/user/login', loginData),
};

const User = {
  getInfo: () => instance.get('/user/info'),
};

export default {Auth, User};
