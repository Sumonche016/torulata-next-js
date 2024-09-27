import { configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "./ClientApi/ClientApi";
import { productSlice } from "./ProductSlice/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [ProductApi.reducerPath]: ProductApi.reducer,
      productSlice: productSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ProductApi.middleware),
  });
};
