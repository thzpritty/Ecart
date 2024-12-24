import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {
    addToCart(state, action) {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        // Increment quantity and update total price for the existing product
        existingProduct.quantity++;
        existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
      } else {
        // Add new product to the cart with quantity and total price
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price
        });
      }
    },
    removeFromCart(state, action){
      state.cart = state.cart.filter(item => item.id !== action.payload)
    },
    emptyCart:(state)=>{
      state.cart = []
    }
  }
});

export const { addToCart , removeFromCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;