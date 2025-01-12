import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchUnits = createAsyncThunk("units/fetchUnits", async () => {



  try {

    const response = await fetch(`${process.env.API}/user/unit`)

    const data = await response.json()

    return data
  } catch (error) {


    console.log("error  fetching units", error)

    throw error

  }




})


export const addUnit = createAsyncThunk('units/addUnit', async (newUnit, { rejectWithValue }) => {

  try {
    const response = await fetch(`${process.env.API}/user/unit`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(newUnit),

    });

    if (!response.ok) {

      const errorData = await response.json();

      return rejectWithValue(errorData);

    }

    const data = await response.json();


    return data;

  } catch (error) {
    console.error('Error adding unit:', error);

    return rejectWithValue(error.message || 'Something went wrong');

  }
});



export const deleteUnit = createAsyncThunk('units/deleteUnit', async (unitId, { rejectWithValue }) => {


  try {
    const response = await fetch(`${process.env.API}/user/unit/${unitId}`, {

      method: "DELETE"

    })

    if (!response.ok) {


      const errorData = await response.json();

      return rejectWithValue(errorData);

    }

    return unitId;

  } catch (error) {
    console.log('Error deleting unit:', error)

    return rejectWithValue(error.message || 'Something went wrong');
  }




})



export const updateUnit = createAsyncThunk('unit/updateUnit', async (updatedUnit, { rejectWithValue }) => {

  try {


    const response = await fetch(`${process.env.API}/user/unit/${updatedUnit?._id}`, {



      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUnit)


    })

    if (!response.ok) {

      const errorData = await response.json();

      return rejectWithValue(errorData)

    }

    const data = await response.json();
    return data

  } catch (error) {
    console.log('error updating unit', error)

    return rejectWithValue(error.message || "something went wrong")

  }
})



const unitSlice = createSlice({
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

      .addCase(addUnit.fulfilled, (state, action) => {
        state.units.push(action.payload);
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.units = state.units.filter(unit => unit._id != action.payload)

      })

      .addCase(deleteUnit.rejected, (state, action) => {

        state.error = action.payload || "error  deleting unit"

      })
      .addCase(updateUnit.fulfilled, (state, action) => {

        const index = state.units.findIndex(unit => unit._id === action.payload._id)
        if (index !== -1) {
          state.units[index] = action.payload
        }
      })
      .addCase(updateUnit.rejected, (state, action) => {

        state.error = action.payload || "Error updating Unit"

      })


  },
});



export default unitSlice.reducer;