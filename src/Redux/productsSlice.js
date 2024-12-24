import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('allProducts/fetchProducts', async () => {
    const result = await axios.get('https://dummyjson.com/products');
    localStorage.setItem('products',JSON.stringify(result.data.products))
    return result.data.products;
});

// Product slice
const productSlice = createSlice({
    name: "allProducts",
    initialState: {
        products: [],
        productsDummy:[],
        loading: false,
        error: ""
    },
    reducers: {
        searchProducts:(state,action)=>{
            state.products=state.productsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.productsDummy = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = false;
            state.products = [];
            state.productsDummy = [];
            state.error = "API Failed... Please try after some time...";
        });
    }
});

export default productSlice.reducer;
export const {searchProducts} = productSlice.actions