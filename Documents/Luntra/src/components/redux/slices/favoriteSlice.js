import {createSlice} from '@reduxjs/toolkit';
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {addFavorite, removeFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;
