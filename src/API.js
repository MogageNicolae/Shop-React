import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3124/'}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ([productsPerPage, currentPage, addedFilters, searchText]) => addedFilters.length === 0 ?
                `products?noOfProducts=${productsPerPage}&page=${currentPage}&search=${searchText}` :
                `products/categories?noOfProducts=${productsPerPage}&page=${currentPage}&search=${searchText}&categories=${addedFilters.join(',').toLowerCase()}`,
        }),
        getProduct: builder.query({
            query: (id = 1) => `products/${id}`,
        }),
        getNoOfProducts: builder.query({
            query: ([addedFilters, searchText]) =>
                (addedFilters.length !== 0) ? `products/size?search=${searchText}&categories=${addedFilters.join(',').toLowerCase()}` : `products/size?search=${searchText}`,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetNoOfProductsQuery
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

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3124/order/'}),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ([user], token = localStorage.getItem('token')) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: user
                }),
            }),
        }),
        getOrder: builder.query({
            query: ([orderId, user], token = localStorage.getItem('token')) => ({
                url: `${orderId}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: user
                }),
            }),
        }),
        createOrder: builder.mutation({
            query: ([userId, orderData], token = localStorage.getItem('token')) => ({
                url: "add",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    id: userId,
                    country: orderData.country,
                    city: orderData.city,
                    address: orderData.address,
                    phone: orderData.phone,
                }),
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderQuery,
    useGetOrdersQuery
} = orderApi;

export const reviewsApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3124/reviews/'}),
    endpoints: (builder) => ({
        getReviewsByProduct: builder.query({
            query: ([productId]) => `product/${productId}`,
        }),
        getReviewsByUser: builder.query({
            query: ([userId]) => `user/${userId}`,
        }),
        addReview: builder.mutation({
            query: ([userId, productId, reviewData], token = localStorage.getItem('token')) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: productId,
                    rating: reviewData.rating,
                    title: reviewData.title,
                    description: reviewData.content,
                }),
            }),
        }),
        deleteReview: builder.mutation({
            query: ([reviewId], token = localStorage.getItem('token')) => ({
                url: `${reviewId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': `${token}`
                },
            }),
        }),
    }),
});

export const {
    useGetReviewsByProductQuery,
    useGetReviewsByUserQuery,
    useAddReviewMutation,
    useDeleteReviewMutation
} = reviewsApi;