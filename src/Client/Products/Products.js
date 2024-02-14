import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Products.css';
import { useNavigate } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrlContext';
import Filter from '../Filter/Filter';
import { Input, Spin, Pagination, Card, Skeleton } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { CartContext } from '../CartContext';
import { FaCartPlus } from 'react-icons/fa6';

function Products() {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
  });
  const navigate = useNavigate();
  const { baseUrl } = useBaseUrl();
  const { addToCart } = useContext(CartContext); // Retrieve addToCart function from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products`);
        localStorage.setItem('products', JSON.stringify(response.data));
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [baseUrl]);

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts =
    products &&
    products.filter((product) => {
      return (
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (product.price >= filters.minPrice && product.price <= filters.maxPrice) &&
        (filters.category === '' || product.category.name === filters.category)
      );
    });
  const currentProducts = filteredProducts && filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const StarRating = ({ rate, count }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rate ? 'star-filled' : 'star-empty'}>
        ★
      </span>
    ));

    return (
      <div className="star-rating">
        {stars}
        <span className="rating-text">{rate > 0 ? `${rate} (${count} reviews)` : 'Rating: 0'}</span>
      </div>
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyFilter = (filterOptions) => {
    setFilters(filterOptions);
  };

  return (
    <div className="product-container">
      <div className="filter-search-component">
        <Filter onApplyFilter={handleApplyFilter} />
        <div className="search-component">
          <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      {currentProducts ? (
        <div className="product-list">
          {currentProducts.map((product) => (
            <div key={product._id} className="products">
              <Card
                hoverable
                className='product-card'

                style={{ width: 240, height: 'auto' }}
                cover={
                  product.images && product.images.length > 0 ? (
                    <img alt={product.title} src={product.images[0]} onClick={() => handleCardClick(product)} style={{ maxHeight: '180px' }} />
                  ) : (
                    <Skeleton.Image style={{ maxHeight: '200px' }} active />
                  )
                  
                }
                actions={[
                  <EllipsisOutlined
                    key="ellipsis"
                    title="More Info"
                    onClick={() => handleCardClick(product)}
                    style={{ color: 'blue', fontSize: '25px' }}
                  />,
                  <FaCartPlus
                    key="addCart"
                    title="Add To Cart"
                    style={{ color: 'blue', fontSize: '25px' }}
                    onClick={() => addToCart(product)} // Call addToCart function
                  />,
                ]}
              >
                <Card.Meta
                  title={product.title}
                  onClick={() => handleCardClick(product)}
                  style={{ color: 'black', textAlign: 'start', marginBottom: '10px' }}
                  description={
                    <div>
                      <p className="product-category">{product.category.name || <Skeleton.Avatar active />}</p>
                      {product.rating ? (
                        <StarRating rate={Math.round(product.rating.rate)} count={product.rating.count} />
                      ) : (
                        <p className="product-rating" style={{ fontSize: '15px' }}>
                          Rating: 0
                        </p>
                      )}
                      <p
                        className="product-price"
                        style={{ textAlign: 'end', fontSize: '25px', fontWeight: '400' }}
                      >
                        ${product.price}
                      </p>
                    </div>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Spin size="large" />
        </div>
      )}
      {products && (
        <Pagination
          current={currentPage}
          total={filteredProducts.length}
          pageSize={itemsPerPage}
          onChange={paginate}
          showSizeChanger={false}
        />
      )}
    </div>
  );
}

export default Products;
