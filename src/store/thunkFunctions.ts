import { API } from '../utils/axios';
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

export const loginUser = createAsyncThunk('user/loginUser', async (body, thunkAPI) => {
  try {
    // const response = await API.post(`/user/join?provider=${provider}`, body);
    const response = await API.post(`/user/join`, body);

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

export const profileUser = createAsyncThunk('user/profileUser', async (body, thunkAPI) => {
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