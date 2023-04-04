import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product, handleRemoveFormCart }) => {
    const { id, img, name, price, quantity } = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className="review-details">
                <p className='product-title'>{name}</p>
                <p>price: <span className='orange-text'>${price}</span></p>
                <p>Order Quantity: <span className='orange-text'>${quantity}</span></p>
            </div>

            <button onClick={ () =>handleRemoveFormCart(id)} className='dlt-btn'>
            <FontAwesomeIcon className='dlt-icon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;