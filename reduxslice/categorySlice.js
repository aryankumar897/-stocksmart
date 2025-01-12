import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {


  try {


    const response = await fetch(`${process.env.API}/user/category`)

    const data = await response.json()


    return data
  } catch (error) {
    console.log(error)
  }




})








export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory, { rejectWithValue }) => {


  try {

    const response = await fetch(`${process.env.API}/user/category`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)

    })

    console.log(response)


    if (!response.ok) {

      const errorData = await response.json()

      return rejectWithValue(errorData)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log("error adding category", error)
    return rejectWithValue(error.message || "something went wrong")

  }






})





export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {

  try {

    const response = await fetch(`${process.env.API}/user/category/${categoryId}`, {
      method: "DELETE"


    })

    return categoryId
  } catch (error) {
    console.log(error)
  }





})






export const updateCategory = createAsyncThunk('categories/updateCategory', async (updateCategory) => {

  try {
    const response = await fetch(`${process.env.API}/user/category/${updateCategory?._id}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(updateCategory)

    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }





})





const categorySlice = createSlice({

  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,

  },

  reducers: {},



  extraReducers: (builder) => {

    builder
    
    .addCase(
      fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(
        fetchCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = action.payload
        })

      .addCase(
        fetchCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message


        })



       









      .addCase(addCategory.fulfilled, (state, action) => {



        console.log(action)
        state.categories.push((action.payload))


      })
      .addCase(deleteCategory.fulfilled, (state, action) => {



        console.log(action, action.payload)
        state.categories = state.categories.filter(cat => cat._id !== action.payload)



      })

      .addCase(updateCategory.fulfilled, (state, action) => {

 console.log("update",action)

        const index=state.categories.findIndex(cat=>cat._id===action.payload._id)
state.categories[index]=action.payload

  })



  }








})


export default categorySlice.reducer