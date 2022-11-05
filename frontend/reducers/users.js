import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const setJWT = async jwt => {
  await AsyncStorage.setItem('user_jwt', jwt);
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null,
    partiesCreated: [],
    partiesJoined: [],
    access: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.partiesCreated = action.payload.created;
      state.partiesJoined = action.payload.joined;
      state.access = action.payload.token ? action.payload.token : state.access;
      state.user = action.payload.username
        ? {
            username: action.payload.username,
            email: action.payload.email,
          }
        : state.user;

      if (action.payload.token) {
        setJWT(action.payload.token);
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.partiesCreated = [];
      state.partiesJoined = [];
      state.access = null;
      setJWT('');
    },
  },
});

const {actions, reducer} = userSlice;
// Extract and export each action creator by name
export const {login, logout} = actions;
// Export the reducer, either as a default or named export
export default reducer;
