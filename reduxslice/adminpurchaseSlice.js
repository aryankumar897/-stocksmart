import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const fetchPurchases = createAsyncThunk(
  "purchases/fetchPurchases",
  async () => {
    const response = await fetch(`${process.env.API}/admin/purchases`);
    const data = await response.json();

    return data;
  }
);



const adminpurchaseSlice = createSlice({
  name: "purchases",
  initialState: {
    purchases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchPurchases.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        (state.loading = false), (state.purchases = action.payload);
      })
    

      
  },
});

export default adminpurchaseSlice.reducer;
