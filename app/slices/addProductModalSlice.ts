import { createSlice } from '@reduxjs/toolkit';

export interface addProductModalType {
  isVisible: boolean;
}

const initialState: addProductModalType = {
  isVisible: false,
};

export const addProductModal = createSlice({
  name: 'visible',
  initialState,
  reducers: {
    toggleAddProductModal: state => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleAddProductModal } = addProductModal.actions;

export default addProductModal.reducer;
