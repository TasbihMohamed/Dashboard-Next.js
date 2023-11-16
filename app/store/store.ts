import { configureStore } from '@reduxjs/toolkit';
import sideBarVisible from '@/app/slices/sidebarSlice';
import addProductModal from '@/app/slices/addProductModalSlice';
import UserData from '@/app/slices/userSlice';
import storeData from '../slices/storeSlice';
export const store = configureStore({
  reducer: { sideBarVisible, addProductModal, UserData, storeData },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
