import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loginType: null
};

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        setType(state, action){
            console.log(action.payload);
            state.loginType = action.payload;
        },
        resetType(state){
            state.loginType = null;
        }
    }
});

export const {setType, resetType} = typeSlice.actions;
export default typeSlice.reducer;