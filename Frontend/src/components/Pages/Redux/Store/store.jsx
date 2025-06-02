import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../counterSlice/cartSlice'


const saveToLocalStorage = (state) => {
  try{
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedState);
  }catch(err){
    console.error("Could not save state", err);
  }
};

const loadFromLocalStorage = () => {
  try{
    const serializedState = localStorage.getItem('cart');
    if(serializedState === null) return undefined;
    return {cart: JSON.parse(serializedState)};
  }catch(err){
    console.error("Could not load state", err);
    return undefined;
  }
};


export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
