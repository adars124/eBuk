import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {}
    },
    reducers: {
        addUser: (state, action) => {
            state.value = action.payload;
        },
        removeUser: state => { state.value = {} }
    }
});

export default userSlice.reducer;

export const { addUser, removeUser } = userSlice.actions;