
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchCustomers = createAsyncThunk("customers/fetchCustomers", async (_, { rejectWithValue }) => {


  try {

    const response = await fetch(`${process.env.API}/user/customers`)

    if (!response.ok) {


      const errorData = await response.json()


      return rejectWithValue(errorData)
    }


    const data = await response.json()
    return data

  } catch (error) {
    return rejectWithValue(error.message || "something went wrong")
  }



})






export const addCustomer = createAsyncThunk('customers/addCustomer', async (newCustomer, { rejectWithValue }) => {


  try {

    const response = await fetch(`${process.env.API}/user/customers`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(newCustomer),

    });

    if (!response.ok) {

      const errorData = await response.json();

      return rejectWithValue(errorData);

    }

    const data = await response.json();


    return data;

  } catch (error) {
    return rejectWithValue(error.message || 'Something went wrong');

  }
});






export const deleteCustomer = createAsyncThunk("customers/deleteCustomers", async (customerId, { rejectWithValue }) => {


  try {
    const response = await fetch(`${process.env.API}/user/customers/${customerId}`, {

      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json();

      return rejectWithValue(errorData);
    }


    return customerId;




  } catch (error) {
    return rejectWithValue(error.message || 'Something went wrong');
  }





})



export const updateCustomer = createAsyncThunk("customers/pdateCustomer", async (updatedCustomer, { rejectWithValue }) => {

  try {




    const response = await fetch(`${process.env.API}/user/customers/${updatedCustomer._id}`, {



      method: "PUT",
      headers: {


        "Contnet-Type": "application/json"
      },
      body: JSON.stringify(updatedCustomer)


    })


 if(!response.ok){

   const  errorData=await response.json()

 return rejectWithValue(errorData)

 }


 const  data=await  response.json()
 return data

  } catch (error) {
    return rejectWithValue(error.message || "something went wrong")
  }





})





const customerSlice = createSlice({
  name: 'customers',

  initialState: {
    customers: [],

    loading: false,

    error: null,

  },
  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchCustomers.pending, (state, action) => {

        state.loading = true

      })




      .addCase(fetchCustomers.fulfilled, (state, action) => {

        state.loading = false


        state.customers = action.payload

      })

      .addCase(fetchCustomers.rejected, (state, action) => {

        state.loading = false

        state.error = action.payload

      })


      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);

      })
      .addCase(addCustomer.rejected, (state, action) => {
        console.log("action error", action)
        state.error = action.payload;

      })





      .addCase(deleteCustomer.fulfilled, (state, action) => {

        state.customers = state.customers.filter(customer => customer._id !== action.payload)
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.payload
      })







      .addCase(updateCustomer.fulfilled, (state, action) => {

      const index=state.customers.findIndex(customer => customer._id===action.payload._id)
    
    state.customers[index]=action.meta
      })
      .addCase(updateCustomer.rejected, (state, action) => {
       
state.error=action.payload


      })






  },
});

export default customerSlice.reducer;
