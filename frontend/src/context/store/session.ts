import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { csrfFetch } from './utils/csrfFetch';

import { User } from '../../types/db_types';
import { RootState, AppThunk } from './index';

export interface SessionState {
  user: User | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SessionState = {
  user: undefined,
  status: 'idle',
}

export interface LoginAction {
  credential: string;
  password: string;
}

export const login = 
  createAsyncThunk('session/loginUser', async ({credential, password}: LoginAction) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password })
    });
    const data = await response.json();
    return data.user;
});

export const restoreUser = (): AppThunk => async (dispatch, getState) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    if (data.user) dispatch(setUser(data.user));
    return data;
};

export const signup = 
  createAsyncThunk('session/signupUser', async(user: User) => {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user })
    })
    const data = await response.json();
    return data;
});

export const logout = (): AppThunk => async (dispatch, getState) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    const data = await response.json();
    dispatch(removeUser({}));
    return data;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      })
  }
})

export const { setUser, removeUser } = sessionSlice.actions;

export const currentUser = (state: RootState) => state.session.user;

export default sessionSlice.reducer;