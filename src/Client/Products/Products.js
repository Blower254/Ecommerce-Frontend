import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // Import the external CSS file
import { FaCartPlus } from "react-icons/fa6";

function Products() {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Set the number of items per page

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

  const addToCart = (productId) => {
    // Implement your add to cart logic here
    console.log(`Product added to cart: ${productId}`);
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

  return (
    <div className="product-container">
      {currentProducts ? (
        <div className="row product-list">
          {currentProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-4 d-flex  check">
              <div className="card product-card">
                <img src={product.image} alt={product.title} className="card-img-top  product-image" />
                <div className="card-body">
                  <h3 className="card-title product-title">{product.title}</h3>
                  <p className="card-text product-category">{product.category}</p>
                  {product.rating ? (
                    <p className="card-text product-rating">
                      Rating: {product.rating.rate} ({product.rating.count} reviews)
                    </p>
                  ) : (
                    <p className="card-text product-rating">Rating: 0</p>
                  )}
                  <div className='card-footer'>
                    <p className="card-text product-price">${product.price}</p>

                    <button className="btn " onClick={() => addToCart(product.id)}>
                      <FaCartPlus className='cart-icon'/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}

      {/* Pagination */}
      <div className="pagination">
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
