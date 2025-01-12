import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"




export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {

  try {

    const response = await fetch(`${process.env.API}/admin/supplier`)

    const data = await response.json()

    return data

  } catch (error) {
    console.log("error fetching suppliers", error)
    throw error
  }





})





const adminsupplierSlice = createSlice({

  name: "suppliers",
  initialState: {
    suppliers: [],
    loading: false,
    error: null
  }


  , reducers: {},

  extraReducers: (builder) => {
    builder
     
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true

      })

      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false
        state.suppliers = action.payload

      })

      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false

        state.error = action.error.message
      })

      
    



  }




})



export default adminsupplierSlice.reducer