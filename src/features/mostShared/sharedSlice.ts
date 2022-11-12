import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Shared } from '../../types/sharedTypes/sharedTypes'

type InitialState = {
  loading: boolean
  shares: Shared[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  shares: [],
  error: ''
}

export const fetchShare = createAsyncThunk('share/fetchShare', () => {
  return axios
    .get('https://api.nytimes.com/svc/mostpopular/v2/shared/30.json?api-key=RZx0MUg2zyOE0ijEGAHp5P2ctcVbgTFz')
    .then(response => response.data.results)
})

const sharedSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchShare.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchShare.fulfilled,
      (state, action: PayloadAction<Shared[]>) => {
        state.loading = false
        state.shares = action.payload
        state.error = ''
        localStorage.setItem('share', JSON.stringify(action.payload));
      }
    )
    builder.addCase(fetchShare.rejected, (state, action) => {
      state.loading = false
      state.shares = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default sharedSlice.reducer
