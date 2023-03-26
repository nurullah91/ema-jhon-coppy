import React, { useEffect, useState } from 'react';
import "./Shop.css"

const Shop = () => {
    
    const [products, setProducts] = useState([])

    useEffect( () =>{
        fetch("products.json")
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])



    return (
        <div className='shop-container'>
            <div className='Products-container'>
                <h2>Products coming hare: {products.length} </h2>;
            </div>
            <div className="card-container">
                <h4>Order summery</h4>
            </div>
        </div>
    );
};

export default Shop;