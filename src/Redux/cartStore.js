import { configureStore } from "@reduxjs/toolkit";
import productSlice from './productsSlice'
import wishListSlice from './wishListSlice'
import cartSlice from './slice/cartSlice';

const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishListReducer:wishListSlice,
        cartReducer:cartSlice

    }
})
export default cartStore