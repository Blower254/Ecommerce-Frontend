import React, { useState, useEffect, useContext } from 'react';
import './Product.css';
import { FaCartPlus } from 'react-icons/fa';
import { CiCreditCard1 } from 'react-icons/ci';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrlContext';
import { Image, Button } from 'react-bootstrap'; // Import Bootstrap components
import { Spin } from 'antd';
import { CartContext } from '../CartContext'; // Import CartContext

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // New state to track selected image index
  const { baseUrl } = useBaseUrl();
  const { addToCart } = useContext(CartContext); // Retrieve addToCart function from CartContext

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products/${productId}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        toast.error('Error Fetching Product');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      toast.warning('No Product Id');
      setLoading(false);
    }
  }, [productId, baseUrl]);

  const handleOpenCheckout = () => {
    // Add your logic for opening checkout
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleAddToCart = () => {
    if (!product) return; // Ensure product is available
    addToCart(product); // Call addToCart function from CartContext
  };

  if (loading) {
    // Show loading state while waiting for product details
    return <div><Spin size='large'/></div>;
  }

  if (!product) {
    // Show a message or redirect if the product is not found
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="product-details">
        <div className='product-specs'>
          <div className='image-section'>
            <div className='image-component'>
              <Image src={product.images[selectedImageIndex]} className='display-image'rounded />

            </div>
            <div className='all-images'>
              <div className='image-thumbnails'>
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${index}`}
                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                    rounded fluid
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <p className='product-description'> {product.description} </p>
            <p className="product-category">Category: {product.category.name}</p>
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
                <Button variant="primary">Add To Cart <FaCartPlus /></Button>
              </div>
              <div className='purchase'>
                <Button variant="success" onClick={handleOpenCheckout}>Buy Now <CiCreditCard1 /></Button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default Product;
