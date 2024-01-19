import React, { useState, useEffect } from 'react';
import './Product.css';
import { FaCartPlus } from 'react-icons/fa6';
import { CiCreditCard1 } from 'react-icons/ci';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        toast.error('Error Fetching Product');
        console.error(error);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      toast.warning('No Product Id');
    }
  }, [productId]);

  const handleAddToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = existingCartItems.some((item) => item.id === product.id);

    if (!isInCart) {
      const updatedCart = [...existingCartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Product added to cart!');
    } else {
      toast.info('Product is already in the cart!');
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className='product-description'> {product.description} </p>
        <p className="product-category">Category: {product.category}</p>
        {product.rating ? (
          <p className="product-rating">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
        ) : (
          <p className="product-rating">Rating: 0</p>
        )}
        <p className="product-price">${product.price}</p>
        <div className='functional-component'>
          <div className='add-to-cart' onClick={handleAddToCart}>
            Add To Cart <FaCartPlus />
          </div>
          <div className='purchase'>
            <button className='purchase-btn'>Buy Now <CiCreditCard1 /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
