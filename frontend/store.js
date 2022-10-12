import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/users';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
