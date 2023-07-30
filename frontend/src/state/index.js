import { configureStore } from '@reduxjs/toolkit';
import userReducer, { addUser, removeUser } from './user.slice';

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;

export { addUser, removeUser };

