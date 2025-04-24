import {configureStore} from '@reduxjs/toolkit';
import favoriteReducer from './slices/favoriteSlice';
const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});
export default store;
