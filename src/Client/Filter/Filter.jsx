import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaFilter } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import './Filter.css';

function Filter() {
  const [show, setShow] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Set a default max value
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleApplyFilter = () => {
    toast(`Category: ${category}, Price Range: $${minPrice} - $${maxPrice}`);
    handleClose();
  };

  const PreviewComponent = () => (
    <div className="filter-preview">
      <h4>Filter Preview</h4>
      <p>Selected Category: {category}</p>
      <p>Min Price: ${minPrice}</p>
      <p>Max Price: ${maxPrice}</p>
    </div>
  );

  return (
    <>
      <div onClick={handleShow} className="filter-field">
        Filter <FaFilter className="filter-icon" />
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="filter-category">
            <h5>Category</h5>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-price">
            <h5>Price Range</h5>
            <div className="price-inputs">
              <label>Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              step="1"
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />

            <div className="price-inputs">
              <label>Max Price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              step="1"
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </div>

          <PreviewComponent />

          <Button variant="primary" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Filter;
