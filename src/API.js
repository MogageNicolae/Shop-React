const cartId = '64c3a47146628';
const token = localStorage.getItem('token');

export async function getProductAfterId(id) {
    return await fetch('https://dummyjson.com/products/' + id)
        .then(res => res.json());
}


export async function getCartAPI() {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Internship-Auth': `${token}`
        },
    }).then(res => res.json());
}

export async function addProductToCartAPI(product) {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Internship-Auth': `${token}`
        },
        body: JSON.stringify({
            products: [product]
        })
    })
}

export async function removeProductFromCartAPI(productId) {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}?products[]=${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Internship-Auth': `${token}`
        },
    }).then(res => res.json())
}

export async function updateProductQuantityAPI(productId, quantity) {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Internship-Auth': `${token}`
        },
        body: JSON.stringify({
            products: [{
                id: productId,
                quantity: quantity
            }]
        })
    }).then(res => res.json())
}