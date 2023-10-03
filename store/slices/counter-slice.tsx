import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import type { RootState } from '@/store'

// Define a type for the slice state
interface CounterState {
  value: number
  catalogue: any[]
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  catalogue: []
}

export const fetchCatalogue = createAsyncThunk(
  'counter/catalogue',
  async () => {
    const { data } = await axios.get(
      'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
    )
    return data
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogue.fulfilled, (state, action) => {
      state.catalogue.push(action.payload)
    })
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
