import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../../utilities/fakedb"
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const { totalProducts } = useLoaderData();


    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // const pageNumber = [];
    // for(let i = 1; i>=totalPages; i++){
    //     pageNumber.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()];



    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    // useEffect(() => {
    //     fetch("https://ema-john-server-green.vercel.app/products")
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://ema-john-server-green.vercel.app/products?page=${currentPage}&limit=${itemsPerPage}`);

            const data = await response.json();
            setProducts(data);

        }
        fetchData();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('https://ema-john-server-green.vercel.app/productsById', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)

        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = [];

                // step-1: get the id of the added product;
                for (const id in storedCart) {
                    // step-2: get product by using id;
                    const addedProduct = cartProducts.find(product => product._id === id);
                    if (addedProduct) {
                        // step-3: get added quantity;
                        const quantity = storedCart[id];

                        // step-4: add quantity to the product quantity;
                        addedProduct.quantity = quantity;

                        // step-5: add the product to the saved cart array;
                        savedCart.push(addedProduct);
                    }
                }

                // step-6: set the cart;
                setCart(savedCart);
            })

    }, [])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];

        // if product don't exist in the cart then set quantity = 1 and if exist update quantity by 1;
        let newCart = [];
        const exist = cart.find(pd => pd._id === product._id);

        if (!exist) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exist.quantity = exist.quantity + 1;

            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exist];
        }


        setCart(newCart);
        addToDb(product._id)
    }

    const options = [5, 10, 15, 20];
    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }


    return (
        <div>
            <div className='shop-container'>
                <div className='Products-container'>
                    {
                        products.map(product => <Product product={product}
                            key={product._id}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="card-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to='/orders'>
                            <button className='proceed-btn' >Review Orders  <FontAwesomeIcon icon={faArrowRight} /></button>

                        </Link>
                    </Cart>
                </div>
            </div>
            {/* pagination */}
            <div className="pagination">
                <h3>This is page number: {currentPage}</h3>
                {
                    pageNumbers.map(number => <button

                        className={currentPage === number ? 'selected' : ''}
                        key={number}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }

                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>

            </div>
        </div>
    );
};

export default Shop;