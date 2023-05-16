import { configureStore } from '@reduxjs/toolkit';

import authUserReducer from './slices/auth-user';
import modalsReducer from './slices/modals';

export const store = configureStore({
   reducer: {
      authUser: authUserReducer,
      modals: modalsReducer,
   },
});
