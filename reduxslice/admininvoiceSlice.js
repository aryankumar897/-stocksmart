import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



 export const fetchInvoices=createAsyncThunk("invoices/fetchInvoice", async()=>{

  try {
    const  response= await  fetch(`${process.env.API}/admin/invoice`)
    const data= await response.json()
   
     console.log("invoice data",  data)
   
    return data
  } catch (error) {
     console.log("error fetching invoices",  error)
  }

 })









const admininvoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(fetchInvoices.pending, (state, action) => {
    
       state.loading=true
    })
    .addCase(fetchInvoices.fulfilled, (state, action) => {
    
      state.loading=false 
       state.invoices=action.payload

   })


 .addCase(fetchInvoices.rejected, (state, action) => {
    
    state.loading=false
     state.error=action.error.message


   })
   
     

  },
});

export default admininvoiceSlice.reducer;
