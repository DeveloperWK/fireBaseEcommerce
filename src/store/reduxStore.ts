import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Features/cartSlice";
import firebaseApiSlice from "../Features/firebaseApiSlice";

const store = configureStore({
  reducer: {
    [firebaseApiSlice.reducerPath]: firebaseApiSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
