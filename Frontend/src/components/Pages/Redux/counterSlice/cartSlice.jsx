import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    searchTerm: ''
  },
  reducers: {
    addToCart: (state, action) => {
      const selectedProduct = action.payload
      state.items.push({...selectedProduct, quantity:selectedProduct.quantity ?? 0, weight:selectedProduct.weight ?? 0});
    },
    removeProduct:(state,action) => {
      const removeItem = action.payload
      state.items = state.items.filter(item => item.item_id !== removeItem.item_id);
    },
    increaseItem: (state, action) => {
      const newItem = action.payload
      if (!newItem || !newItem.item_id) {
        console.error('increaseItem: invalid payload', newItem)
        return
      }
      const existing = state.items.find(
        item => item.item_id === newItem.item_id
      )
      const priceToAdd = Number(newItem.item_price ?? 0)
      const stockLimit = Number(newItem.stock_quantity ?? 0)

      if (existing) {
        if (existing.quantity >= stockLimit) {
          console.warn(`Only ${stockLimit} items in stock.`)
          alert(
            `Current stock limit is reached! only ${stockLimit} item(counts) available.`
          )
          return
        }
        existing.quantity = (existing.quantity || 0) + 1
        existing.weight = (existing.weight || 0) + 500
      } else {
        if (stockLimit <= 0) {
          console.warn('Item is out of stock')
          alert('Item is out of stock')
          return
        }
        state.items.push({ ...newItem, quantity: 1, weight: 500 })
      }

      state.totalPrice += priceToAdd
      console.log('Added Item:', newItem)
    },
    decreaseItem: (state, action) => {
      const item_id = action?.payload?.item_id
      if (!item_id) return

      const existing = state.items.find(item => item.item_id === item_id)

      if (existing && existing.quantity > 0) {
        existing.quantity -= 1
        existing.weight -= 500
        state.totalPrice -= Number(existing.item_price ?? 0)

        if (existing.quantity === 0) {
          state.items = state.items.filter(item => item.item_id !== item_id)
        }
      }
    },
    orderItem:(state,action) =>{
      const selectedItem = action.payload
      state.items.push(selectedItem);
    },
    clearCart: state => {
      state.items = []
      state.totalPrice = 0
    },
    setSearchItem: (state, action) => {
      state.searchTerm = action.payload
    }
  }
})

export const selectedCartItems = state => state.cart.items

export const selectedCartTotalPrice = state => state.cart.totalPrice

export const selectSearchItem = state => state.cart.searchTerm

export const {
  addToCart,
  removeProduct,
  increaseItem,
  decreaseItem, orderItem,
  clearCart,
  setSearchItem
} = cartSlice.actions

export default cartSlice.reducer
