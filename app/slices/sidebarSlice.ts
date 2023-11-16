import { createSlice } from '@reduxjs/toolkit';

export interface visibleSliceType {
  isVisible: boolean;
}

const initialState: visibleSliceType = {
  isVisible: true,
};

export const visibleSlice = createSlice({
  name: 'visible',
  initialState,
  reducers: {
    toggleSideBar: state => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleSideBar } = visibleSlice.actions;

export default visibleSlice.reducer;
