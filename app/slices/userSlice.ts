import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/DataBase';

interface InitialState {
  data: User | null;
}

const initialState: InitialState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
