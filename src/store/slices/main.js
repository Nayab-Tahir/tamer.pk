import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  email: '',
  auth_token: localStorage.getItem('auth_token'),
  loading: false,
}

const Main = createSlice({
  name: 'mainSlice',
  initialState: initialState,
  reducers: {
    UpdateCredentials(state, action) {
      state.username = action.payload.username
      state.email = action.payload.email
    },
    saveToken(state, action) {
      localStorage.setItem('auth_token', action.payload)
      state.auth_token = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
})

export const { UpdateCredentials, saveToken, setLoading } = Main.actions
export const MainReducer = Main.reducer
