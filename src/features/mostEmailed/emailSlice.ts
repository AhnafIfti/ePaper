import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Email } from '../../types/emailedTypes/emailTypes'

type InitialState = {
  loading: boolean
  emails: Email[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  emails: [],
  error: ''
}

export const fetchEmail = createAsyncThunk('email/fetchEmail', () => {
  return axios
    .get('https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=RZx0MUg2zyOE0ijEGAHp5P2ctcVbgTFz')
    .then(response => response.data.results)
})

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmail.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchEmail.fulfilled,
      (state, action: PayloadAction<Email[]>) => {
        state.loading = false
        state.emails = action.payload
        state.error = ''
        localStorage.setItem('email', JSON.stringify(state.emails));
      }
    )
    builder.addCase(fetchEmail.rejected, (state, action) => {
      state.loading = false
      state.emails = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default emailSlice.reducer
