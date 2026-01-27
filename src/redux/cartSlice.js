import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* =======================
   ADD TO CART (POST)
======================= */
export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async ({ productId, token }) => {
    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    if (!res.ok) {
      throw new Error("Failed to add to cart");
    }

    return await res.json();
  }
);

/* =======================
   UPDATE CART (PUT)
======================= */
export const updateCartAPI = createAsyncThunk(
  "cart/updateCartAPI",
  async ({ cartItemId, quantity, token }) => {
    const res = await fetch(
      `http://localhost:5000/cart/${cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update cart");
    }

    return await res.json();
  }
);

/* =======================
   REMOVE FROM CART (DELETE)
======================= */
export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async ({ cartItemId, token }) => {
    const res = await fetch(
      `http://localhost:5000/cart/${cartItemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to remove item");
    }

    return cartItemId; // backend returns message only
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    search: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      /* ADD */
      .addCase(addToCartAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* UPDATE */
      .addCase(updateCartAPI.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

/* EXPORTS */
export const { setSearch, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
