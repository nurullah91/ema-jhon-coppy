import React, { useEffect, useState } from 'react';
import Cart from '../Product/Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import { addToDb, getShoppingCart } from "../../../utilities/fakedb"

const Shop = () => {

    const [products, setProducts] = useState([])

    const [cart, setCart] = useState([]);


    useEffect(() => {
        fetch("products.json")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];



        // step-1: get the id of the added product;
        for (const id in storedCart) {
            // step-2: get product by using id;
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                // step-3: get added quantity;
                const quantity = storedCart[id];

                // step-4: add quantity to the product quantity;
                addedProduct.quantity = quantity;

                // step-5: add the product to the saved cart array;
                savedCart.push(addedProduct);
            }
            console.log('added product', addedProduct);
        }

            // step-6: set the cart;
            setCart(savedCart);


    }, [products])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }


    return (
        <div className='shop-container'>
            <div className='Products-container'>
                {
                    products.map(product => <Product product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;