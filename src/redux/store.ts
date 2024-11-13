import { configureStore } from '@reduxjs/toolkit'
import tableSlice from "../redux/features/table/tableSlice"

export const store = configureStore({
  reducer :{
    table: tableSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch