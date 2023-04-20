import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import usersReducer from './usersSlice';
import typeReducer from './typeSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        type: typeReducer
    }
});