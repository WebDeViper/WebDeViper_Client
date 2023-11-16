import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authUser, profileUser, loginUser } from './thunkFunctions';
// import { toast } from 'react-toastify';

interface UserState {
  userInfo: UserInfo;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: UserState = {
  userInfo: {
    id: '',
    email: '',
    nickName: '',
    category: null,
    profileImg: '',
  },
  isAuth: false,
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = initialState.userInfo;
      state.isAuth = false;
      state.isLoading = false;
      state.error = '';
      localStorage.clear();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ userInfo: UserInfo; token: string }>) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        state.error = '';
        localStorage.setItem('accessToken', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // toast.error(action.payload);
      })

      .addCase(authUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action: PayloadAction<{ userInfo: UserInfo; token: string }>) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        state.error = '';
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userInfo = initialState.userInfo;
        state.isAuth = false;
        localStorage.removeItem('accessToken');
      })
      .addCase(profileUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(profileUser.fulfilled, (state, action: PayloadAction<{ userInfo: UserInfo; token: string }>) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        localStorage.setItem('accessToken', action.payload.token);
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userInfo = initialState.userInfo;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
