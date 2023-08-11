import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export async function getProductAfterId(id) {
    return await fetch('https://dummyjson.com/products/' + id)
        .then(res => res.json());
}


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/'}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ([productsPerPage, currentPage, addedFilters]) => addedFilters.length === 0 ?
                `products?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}` :
                `products/category/${addedFilters[0]}?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`,
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
    baseQuery: fetchBaseQuery({baseUrl: 'https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/'}),
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (token = localStorage.getItem('token'), cart = '64c3a47146628') => ({
                url: `${cart}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${token}`
                },
            }),
        }),
        addProductToCart: builder.mutation({
            query: (product, token = localStorage.getItem('token'), cart = '64c3a47146628') => ({
                url: `${cart}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${token}`
                },
                body: JSON.stringify({
                    products: [product]
                }),
            }),
        }),
        updateProductFromCart: builder.mutation({
            query: ([productId, quantity], token = localStorage.getItem('token'), cart = '64c3a47146628') => ({
                url: `${cart}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${token}`
                },
                body: JSON.stringify({
                    products: [{
                        id: productId,
                        quantity: quantity,
                    }]
                }),
            }),
        }),
        removeProductFromCart: builder.mutation({
            query: (productId, token = localStorage.getItem('token'), cart = '64c3a47146628') => ({
                url: `${cart}?products[]=${productId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${token}`
                },
            }),
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddProductToCartMutation,
    useUpdateProductFromCartMutation,
    useRemoveProductFromCartMutation
} = cartApi;