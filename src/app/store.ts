import { configureStore } from '@reduxjs/toolkit'
import shareReducer from '../features/mostShared/sharedSlice'
import viewReducer from '../features/mostViewed/viewSlice'
import emailReducer from '../features/mostEmailed/emailSlice'

const store = configureStore({
  reducer: {
    share: shareReducer,
    view: viewReducer,
    email: emailReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
