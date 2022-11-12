import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Viewed } from '../../types/viewedTypes/viewedTypes'

type InitialState = {
  loading: boolean
  views: Viewed[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  views: [],
  error: ''
}

export const fetchView = createAsyncThunk('view/fetchView', () => {
  return axios
    .get('https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=RZx0MUg2zyOE0ijEGAHp5P2ctcVbgTFz')
    .then(response => response.data.results)
})

const viewedSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchView.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchView.fulfilled,
      (state, action: PayloadAction<Viewed[]>) => {
        state.loading = false
        state.views = action.payload
        state.error = ''
        localStorage.setItem('view', JSON.stringify(action.payload));
      }
    )
    builder.addCase(fetchView.rejected, (state, action) => {
      state.loading = false
      state.views = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default viewedSlice.reducer
