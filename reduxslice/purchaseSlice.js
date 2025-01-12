import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addPurchase = createAsyncThunk(
  "purchases/addPurchases",
  async (newPurchase, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.API}/user/purchases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newPurchase),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "someting went wrong");
    }
  }
);

export const fetchPurchases = createAsyncThunk(
  "purchases/fetchPurchases",
  async () => {
    const response = await fetch(`${process.env.API}/user/purchases`);
    const data = await response.json();

    return data;
  }
);

export const deletePurchase = createAsyncThunk(
  "purchases/deletePurchases",
  async (purchaseId) => {
    await fetch(`${process.env.API}/user/purchases/${purchaseId}`, {
      method: "DELETE",
    });

    return purchaseId;
  }
);

const purchaseSlice = createSlice({
  name: "purchases",
  initialState: {
    purchases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPurchase.fulfilled, (state, action) => {
        state.purchases.push(action.payload);
      })
      .addCase(addPurchase.rejected, (state, action) => {
        state.error = action.payload || " error adding purchases";
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        (state.loading = false), (state.purchases = action.payload);
      })
      .addCase(addPurchase.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(deletePurchase.fulfilled, (state, action) => {
        state.purchases = state.purchases.filter(
          (purchase) => purchase._id !== action.payload
        );
      });
  },
});

export default purchaseSlice.reducer;
