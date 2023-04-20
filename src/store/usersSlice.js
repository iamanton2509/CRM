import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getFirestore, collection, getDocs, updateDoc, setDoc, doc} from 'firebase/firestore';
import './../firebase';
const db = getFirestore();

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async function(_, {rejectWithValue}){
        try {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const usersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return usersList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    status: null,
    error: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: state => {
            state.status = 'loading';
            state.error = null;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.status = 'successful';
            state.error = null;
        },
        [getUsers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

const {} = usersSlice.actions;
export default usersSlice.reducer;