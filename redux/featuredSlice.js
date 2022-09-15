import { createSlice } from '@reduxjs/toolkit';

const featuredSlice = createSlice({
  name: 'featuredImages',
  initialState: {
    images: ['/img/featured.png', '/img/featured2.png', '/img/featured3.png'],
  },

  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    deleteImage: (state, action) => ({
      ...state,
      images: state.images.filter((item, key) => key !== action.payload.key),
    }),
  },
});

export const { addImage, deleteImage } = featuredSlice.actions;
export default featuredSlice.reducer;
