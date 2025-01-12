import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      const response = await fetch(`${process.env.API}/admin/products`);
  
      const data = await response.json();
  
      return data;
    }
  );

const adminproductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
     
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload;
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
  },
});

export default adminproductSlice.reducer;
