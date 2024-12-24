import { createSlice } from "@reduxjs/toolkit";


const wishListSlice = createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[]
    },
    reducers:{

        addToWishlist:(state,action)=>{
            
            state.wishlist.push(action.payload)
        
        },
        removeWishlist:(state,action)=>{
            state.wishlist=state.wishlist.filter(item=>item.id!=action.payload)
        }

    }
})
export const {addToWishlist,removeWishlist}=wishListSlice.actions
export default wishListSlice.reducer