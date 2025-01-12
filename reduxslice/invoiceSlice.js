import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



 export const fetchInvoices=createAsyncThunk("invoices/fetchInvoice", async()=>{

  try {
    const  response= await  fetch(`${process.env.API}/user/invoice`)
    const data= await response.json()
   
     console.log("invoice data",  data)
   
    return data
  } catch (error) {
     console.log("error fetching invoices",  error)
  }

 })






export const addInvoice = createAsyncThunk(
  "invoice/addInvoice",
  async (newInvoice, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.API}/user/invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

 export const deleteInovice=createAsyncThunk("invoice/deleteInvoice",  async(invoiceId)=>{

 console.log("invoiceIdzzzz",invoiceId)


 await  fetch(`${process.env.API}/user/invoice/${invoiceId}`,{  

 method:"DELETE"

  })


   return invoiceId
 })




const invoiceSlice = createSlice({
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
   
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })



      .addCase(addInvoice.rejected, (state, action) => {
        state.error = action.payload || "error adding invoice";
      })



      .addCase(deleteInovice.fulfilled, (state, action) => {
       

         state.invoices=state.invoices.filter(invoice=>invoice?._id !==action.payload)
      });


  },
});

export default invoiceSlice.reducer;
