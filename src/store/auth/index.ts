import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {UserModel} from 'src/models'
import {Path, removeToken, request} from 'src/utils'

interface UserState {
  loading: boolean
  loaded: boolean
  error?: string
  user?: UserModel
}
const initialState: UserState = {
  loading: false,
  loaded: false,
}

export const userMeAction = createAsyncThunk('user/me', async () => {
  const res = await request<UserModel>('GET', Path.Auth.me, {})
  return {user: res}
})

export const userSignOutAction = createAction('user/sign-out')

export const {reducer} = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (build) =>
    build
      .addCase(userMeAction.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(userMeAction.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.loaded = true
        state.loading = false
      })
      .addCase(userMeAction.rejected, (state) => {
        state.loaded = true
        state.loading = false
        state.error = ''
      })
      .addCase(userSignOutAction, (state) => {
        removeToken('accessToken')
        removeToken('refreshToken')
        state.user = undefined
        state.error = undefined
      }),
})
