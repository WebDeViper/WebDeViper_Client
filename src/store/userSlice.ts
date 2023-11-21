import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authUser, profileUser, loginUser, deleteAlarm } from './thunkFunctions';
import { toast } from 'react-toastify';
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
    category: null,
    nickName: '',
    profileImg: '',
    email: '',
    statusMsg: '',
    isServiceAdmin: 'n',
    alarmMessage: [],
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
    getAlarmMessage(state, action) {
      state.userInfo.alarmMessage = [...state.userInfo.alarmMessage, action.payload];
      toast.info('알림이 왔습니다.');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ userInfo: UserInfo; accessToken: string }>) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        state.error = '';
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // toast.error(action.payload);
      })

      .addCase(deleteAlarm.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteAlarm.fulfilled, (state, action) => {
        state.isLoading = false;
        const newAlarmMessage = state.userInfo.alarmMessage.filter(item => item._id !== action.payload._id);
        state.userInfo.alarmMessage = newAlarmMessage;
        state.error = '';
      })
      .addCase(deleteAlarm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
export const { logout, getAlarmMessage } = userSlice.actions;
