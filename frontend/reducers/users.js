import {createSlice} from '@reduxjs/toolkit';

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
      const token = action.payload;

      state.isAuthenticated = true;
      state.partiesCreated = token.created;
      state.partiesJoined = token.joined;
      state.access = token.access || state.access;
      state.user = token.user
        ? {
            firstName: token.first_name,
            lastName: token.last_name,
            id: token.id,
          }
        : state.user;
      state.field = token.user || [];
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.partiesCreated = [];
      state.partiesJoined = [];
      state.access = null;
    },
  },
});

const {actions, reducer} = userSlice;
// Extract and export each action creator by name
export const {login, logout} = actions;
// Export the reducer, either as a default or named export
export default reducer;
