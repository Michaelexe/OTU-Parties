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
  delete: () => instance.delete('/user/delete'),
};

const Parties = {
  create: partyData => instance.post('/parties/create', partyData),
  all: () => instance.get('/parties/all'),
  join: party_uuid => instance.post('/parties/join', {party_uuid}),
  requests: () => instance.get('/parties/requests'),
  acceptRequest: (party_uuid, user_uuid) =>
    instance.put('/parties/accept', {party_uuid, user_uuid}),
  declineRequest: (party_uuid, user_uuid) =>
    instance.delete('/parties/decline', {data: {party_uuid, user_uuid}}),
  members: party_uuid => instance.get(`/parties/${party_uuid}/members`),
  leaveParty: party_uuid => instance.delete(`/parties/${party_uuid}/leave`),
  deleteParty: party_uuid => instance.delete(`/parties/${party_uuid}/delete`),
};

export default {Auth, User, Parties};
