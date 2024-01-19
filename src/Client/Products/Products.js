import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // Import the external CSS file
import {  FaEye } from "react-icons/fa6";
//import Product from './Product'; 
//import { AiFillCloseCircle } from "react-icons/ai";
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Set the number of items per page
  const navigate = useNavigate(); 
  //const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

 

  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`);
  };
  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display on the page
  const currentProducts = products && products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const StarRating = ({ rate, count }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rate ? 'star-filled' : 'star-empty'}>
        ★
      </span>
    ));
  
    return (
      <div className="star-rating">
        {stars}
        <span className="rating-text">
          {rate > 0 ? `${rate} (${count} reviews)` : 'Rating: 0'}
        </span>
      </div>
    );
  };
  return (
    <div className="product-container">
      {currentProducts ? (
        <div className="row product-list">
          {currentProducts.map((product) => (
             <div key={product.id} className="col-md-3 mb-4 d-flex check">
             <div className="product-card" onClick={() => handleCardClick(product)}>
                <img src={product.image} alt={product.title} className="card-img  product-image" />
                <div className='content-section'>
                <div className="card-body">
                  <div className='body-content'>
                      <h3 className="card-title product-title">{product.title}</h3>
                      <p className="card-text product-category">{product.category}</p>
                      {product.rating ? (
                          <StarRating rate={Math.round(product.rating.rate)} count={product.rating.count} />
                        ) : (
                          <p className="card-text product-rating">Rating: 0</p>
                        )}
                    </div>
                  <div className='card-footer'>
                    <p className="card-text product-price">${product.price}</p>
                    
                    <button className="btn " >
                      <FaEye   className='cart-icon'/>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <div ><Loading/></div>
      )}
   
      
      {/* Pagination */}
      <div className="shadow-lg p-3  bg-white rounded pagination">
        {products && (
          <ul>
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
              <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Products;
