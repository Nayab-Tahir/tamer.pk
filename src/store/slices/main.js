import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  username: '',
  email: '',
  phone: '',
  address: {
    street: '',
    country: '',
  },
  userId: '',
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

    saveInformation(state, action) {
      state.username = action.payload.username
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.userId = action.payload.sub
      state.name = action.payload.name
      if (action.payload.address && Object.keys(action.payload.address).length > 0) {
        state.address = {
          ...state.address,
          ...action.payload.address,
        }
      }
    },
  },
})

export const { UpdateCredentials, saveToken, setLoading, saveInformation } = Main.actions
export const MainReducer = Main.reducer
