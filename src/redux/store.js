import {configureStore} from "@reduxjs/toolkit";
import quantityChangeReducer from "./quantityChangeSlice";
import {cartApi, productsApi} from "../API";

export const store = configureStore({
    reducer: {
        quantityChange: quantityChangeReducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartApi.middleware, productsApi.middleware),

})