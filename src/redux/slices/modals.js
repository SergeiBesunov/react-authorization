import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   activeSelectedAvatar: false,
};

export const modalsSlice = createSlice({
   name: 'modals',
   initialState,
   reducers: {
      toggleModalSelectedAvatar: (state, action) => {
         if (action.payload === false) {
            state.activeSelectedAvatar = false;
         } else {
            state.activeSelectedAvatar = true;
         }
      },
   },
});

export const { toggleModalSelectedAvatar } = modalsSlice.actions;

export default modalsSlice.reducer;
