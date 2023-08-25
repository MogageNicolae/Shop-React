import {configureStore} from "@reduxjs/toolkit";
import quantityChangeReducer from "./quantityChangeSlice";
import {cartApi, orderApi, productsApi} from "../API";

export const store = configureStore({
    reducer: {
        quantityChange: quantityChangeReducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartApi.middleware, productsApi.middleware, orderApi.middleware),

})