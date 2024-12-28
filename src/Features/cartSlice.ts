import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  quantity: number;
  [key: string]: unknown;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    modifyQuantityOfAnItem: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    emptyCart: () => {
      return [];
    },
  },
});
export const { addToCart, removeFromCart, modifyQuantityOfAnItem, emptyCart } =
  cartSlice.actions;
export default cartSlice;
