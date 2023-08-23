import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export async function getProductAfterId(id) {
    return await fetch('http://localhost:3124/products/' + id)
        .then(res => res.json());
}


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3124/'}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ([productsPerPage, currentPage, addedFilters]) => addedFilters.length === 0 ?
                `products?noOfProducts=${productsPerPage}&page=${currentPage}` :
                `products/categories?noOfProducts=${productsPerPage}&page=${currentPage}&categories=${addedFilters.join(',')}`,
        }),
        getProduct: builder.query({
            query: (id = 1) => `products/${id}`,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
} = productsApi;

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3124/cart/'}),
    endpoints: (builder) => ({
        getCart: builder.query({
            query: ([cart], token = localStorage.getItem('token')) => ({
                url: 'get',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: cart
                }),
            }),
        }),
        getCartSize: builder.query({
            query: ([cart], token = localStorage.getItem('token')) => ({
                url: 'get/size',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: cart
                }),
            }),
        }),
        addProductToCart: builder.mutation({
            query: ([productId, cart], token = localStorage.getItem('token')) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: cart,
                    productId: productId
                }),
            }),
        }),
        updateProductFromCart: builder.mutation({
            query: ([productId, quantity, cart], token = localStorage.getItem('token')) => ({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: cart,
                    productId: productId,
                    quantity: quantity,
                }),
            }),
        }),
        removeProductFromCart: builder.mutation({
            query: ([productId, cart], token = localStorage.getItem('token')) => ({
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: cart,
                    productId: productId
                }),
            }),
        }),
    }),
});

export const {
    useGetCartQuery,
    useGetCartSizeQuery,
    useAddProductToCartMutation,
    useUpdateProductFromCartMutation,
    useRemoveProductFromCartMutation
} = cartApi;