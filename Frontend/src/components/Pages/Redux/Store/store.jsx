import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../counterSlice/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice
  }
})
