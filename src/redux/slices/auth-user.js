import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';

const defaultAvatar = "https://api.dicebear.com/6.x/bottts/svg?seed=Oliver"

const initialState = {
   email: null,
   token: null,
   id: null,
   photoUrl: defaultAvatar,
   isAnonymous: null,
   initStatus: 'pending',
};

// При запуске приложения проверяем существует ли сессия, если можем достатать из нее пользователя,
// то обновляем redux данными этого пользователя, и пропуская страницу авторизации 
// попадаем на главную страницу под существующей сессией, иначе попадаем на страницу авторизации
export const authenticateUser = createAsyncThunk('auth-user/authenticateUser', async () => {
   try {
      const auth = getAuth();
      const initialization = await auth._initializationPromise;

      if (auth.currentUser) {
         const user = auth.currentUser;
         const userData = {
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            photoUrl: user.photoURL,
            isAnonymous: user.isAnonymous,
         };
         return userData;
      } else {
         return;
      }
   } catch (error) {
      console.log('Ошибка инициализации пользователя');
   }
});

export const authUserSlice = createSlice({
   name: 'auth-user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.email = action.payload.email;
         state.token = action.payload.token;
         state.id = action.payload.id;
         state.photoUrl = action.payload.photoUrl;
         state.isAnonymous = action.payload.isAnonymous;
      },

      resetUser: (state) => {
         state.email = null;
         state.token = null;
         state.id = null;
         state.photoUrl = defaultAvatar;
         state.isAnonymous = null;
      },

      updateAvatar: (state, action) => {
         state.photoUrl = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(authenticateUser.pending, (state) => {
            state.initStatus = 'pending';
         })
         .addCase(authenticateUser.fulfilled, (state, action) => {
            if (action.payload) {
               state.email = action.payload.email;
               state.token = action.payload.token;
               state.id = action.payload.id;
               state.photoUrl = action.payload.photoUrl;
               state.isAnonymous = action.payload.isAnonymous;
            }
            state.initStatus = 'sucsess';
         });
   },
});

export const { setUser, resetUser, updateAvatar } = authUserSlice.actions;

export default authUserSlice.reducer;
