import { API, AUTH } from '../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface CustomError extends Error {
  // name: string;
  // message: string;
  // stack?: string; - Error 인터페이스 프로퍼티들을 직접 쓰거나 아니면 상속해준다.

  response?: {
    data: string;
    status: number;
    headers: string;
  };
}

export const loginUser = createAsyncThunk('user/loginUser', async (body: object, thunkAPI) => {
  try {
    // const response = await API.post(`/user/join?provider=${provider}`, body);
    const response = await API.post(`/user/login`, body);

    return response.data;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr);
    return thunkAPI.rejectWithValue(customErr.response?.data || customErr.message);
  }
});

export const socialUser = createAsyncThunk('user/socialUser', async (body: object, thunkAPI) => {
  try {
    // const response = await API.post(`/user/join?provider=${provider}`, body);
    const response = await API.post(`/user/kakaologin`, body);

    return response.data;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr);
    return thunkAPI.rejectWithValue(customErr.response?.data || customErr.message);
  }
});

export const authUser = createAsyncThunk('user/authUser', async (_, thunkAPI) => {
  try {
    const response = await API.get(`/user`);
    return response.data;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr);
    return thunkAPI.rejectWithValue(customErr.response?.data || customErr.message);
  }
});

export const profileUser = createAsyncThunk('user/profileUser', async (body: object, thunkAPI) => {
  try {
    const response = await API.patch('/user/profile', body);
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr);
    return thunkAPI.rejectWithValue(customErr.response?.data || customErr.message);
  }
});

export const socialRefreshUser = createAsyncThunk('auth/socialRefreshUser', async (_, thunkAPI) => {
  try {
    const response = await AUTH.get('/auth/refresh');
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr);
    return thunkAPI.rejectWithValue(customErr.response?.data || customErr.message);
  }
});

export const createGroup = createAsyncThunk('group/createGroup', async (body, thunkAPI) => {
  try {
    const response = await API.patch('/group/~~', body);
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr);
    return thunkAPI.rejectWithValue(customErr.response?.data || customErr.message);
  }
});

export const deleteAlarm = createAsyncThunk('/notification', async (body: object, thunkAPI) => {
  try {
    const response = await API.patch(`/notification`, body);
    if (response.data.isSuccess) {
      return response.data;
    }
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr);
    return thunkAPI.rejectWithValue(customErr.response?.data || customErr.message);
  }
});
