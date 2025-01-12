import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"




export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {

  try {

    const response = await fetch(`${process.env.API}/user/supplier`)

    const data = await response.json()

    return data

  } catch (error) {
    console.log("error fetching suppliers", error)
    throw error
  }





})


export const addSupplier = createAsyncThunk('suppliers/addSupplier', async (newSupplier, { rejectWithValue }) => {



  try {

    const response = await fetch(`${process.env.API}/user/supplier`, {

      method: 'POST',
      headers: {
        "Contnet-Type": "application/json"
      },

      body: JSON.stringify(newSupplier)



    })



    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue(errorData)
    }
    const data = await response.json()
    return data


  } catch (error) {
    console.log("error adding supplier", error)

    return rejectWithValue(error.message || 'something went wrong')
  }




})


export const deleteSupplier=createAsyncThunk("suppliers/deleteSupplier",async( supplierId,{rejectWithValue}   )=>{
 try {
  
   const  response=await  fetch(`${process.env.API}/user/supplier/${supplierId}`,{   
    method:"DELETE"
   }   )




 if(!response.ok){
 const  errorData=await response.json()
 return  rejectWithValue(errorData)
 }

 return  supplierId



 } catch (error) {
   console.log("error deleting supplier", error)
    return  rejectWithValue(error.message || 'something went wrong')
 }







})




export const updateSupplier=createAsyncThunk("suppliers/updateSupplier",async( updatedSupplier,{rejectWithValue}    )=>{   

try {
  
 const  response=await  fetch(`${process.env.API}/user/supplier/${updatedSupplier?._id}`,{   

  method: 'PUT',

headers:{
  "Content-Type": "application/json"
},
body: JSON.stringify(updatedSupplier)

  } )


  if(!response.ok){


     const errorData=await response.json()
    return rejectWithValue(errorData)


  }




   const data=await response.json()
    return  data

} catch (error) {
  

 console.log("error updating supplier", error)

 return rejectWithValue(error.message || "something went wrong")

}


} )





const supplierSlice = createSlice({

  name: "suppliers",
  initialState: {
    suppliers: [],
    loading: false,
    error: null
  }


  , reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.suppliers.push(action.payload)

      })
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

      
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false

        state.error = action.payload.err ||  " error  deleting supplier"
      })



      .addCase(deleteSupplier.fulfilled, (state, action) => {
      state.suppliers=state.suppliers.filter((supplier)=>supplier._id !==action.payload  )

      })


 .addCase(updateSupplier.fulfilled, (state, action) => {

   const index=state.suppliers.findIndex(supplier=>supplier._id ===action.payload)


if(index !==-1){


  state.suppliers[index]=action.payload
}


      })

      .addCase(updateSupplier.rejected, (state, action) => {
     

        state.error = action.payload.err || " error  updating supplier"
      })



  }




})



export default supplierSlice.reducer