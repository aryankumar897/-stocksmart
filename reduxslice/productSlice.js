import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${process.env.API}/user/products`);

    const data = await response.json();

    return data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.API}/user/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct) => {
    const response = await fetch(
      `${process.env.API}/user/products/${updatedProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedProduct),
      }
    );

    const data = await response.json();
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await fetch(`${process.env.API}/user/products/${productId}`, {
      method: "DELETE",
    });
    return productId;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload;
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (prod) => prod._id === action.payload
        );
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (prod) => prod._id === action.payload._id
        );

        state.products[index] = action.payload;
      });
  },
});

export default productSlice.reducer;
