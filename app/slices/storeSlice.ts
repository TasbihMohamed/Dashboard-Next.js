import { createSlice } from '@reduxjs/toolkit';
import { Store } from '../types/DataBase';

interface InitialState {
  data: Store | null;
}

const initialState: InitialState = {
  data: null,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setStoreData } = storeSlice.actions;

export default storeSlice.reducer;
