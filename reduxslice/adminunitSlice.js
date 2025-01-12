import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchUnits = createAsyncThunk("units/fetchUnits", async () => {



  try {

    const response = await fetch(`${process.env.API}/admin/unit`)

    const data = await response.json()

    return data
  } catch (error) {


    console.log("error  fetching units", error)

    throw error

  }




})





const adminunitSlice = createSlice({
  name: 'units',

  initialState: {
    units: [],

    loading: false,

    error: null,

  },
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(fetchUnits.pending, (state) => {
      state.loading = true

    })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false
        console.log("action unit", action)
        state.units = action.payload
      })

      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false
        console.log("action error", action)
        state.error = action.error.message
      })

    


  },
});



export default adminunitSlice.reducer;