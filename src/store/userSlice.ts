import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authUser, profileUser, loginUser } from './thunkFunctions';
import { toast } from 'react-toastify';

interface UserInfo {
  id: string;
  email: string;
  nickName: string;
  category: string | null; // category가 어떤 타입인지에 따라 바꾸세요
  profileImg: string;
}

interface UserState {
  userInfo: UserInfo;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
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
    // 동기적으로 백에 요청 없이 프론트에서 로그아웃시키는 코드
    // state 변경하고 로컬 스토리지 값을 초기화
    logout(state) {
      state.userInfo = initialState.userInfo;
      state.isAuth = false;
      state.isLoading = false;
      state.error = '';
      localStorage.clear();
    },
  }, // You can add reducer functions here if needed
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state: UserState, action: PayloadAction<{ userInfo: UserInfo; token: string }>) => {
          state.isLoading = false;
          state.userInfo = action.payload.userInfo;
          state.isAuth = true;
          state.error = '';
          localStorage.setItem('accessToken', action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      .addCase(authUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        state.error = '';
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.userInfo = initialState.userInfo;
        state.isAuth = false;
        localStorage.removeItem('accessToken');
      })
      .addCase(profileUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(profileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        localStorage.setItem('accessToken', action.payload.token);
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.userInfo = initialState.userInfo;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
