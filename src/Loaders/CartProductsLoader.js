import { getShoppingCart } from "../../utilities/fakedb";

const cartProductsLoader = async () => {

    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    console.log(ids);

    const LoadedProducts = await fetch('https://ema-john-server-green.vercel.app/productsById', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)

    });
    const products = await LoadedProducts.json()


    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }


    return savedCart;
}

export default cartProductsLoader;