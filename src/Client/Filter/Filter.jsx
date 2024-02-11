import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaFilter } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import './Filter.css';
import { useBaseUrl } from '../../BaseUrlContext';
import axios from 'axios';
import { Select, Input, Slider } from 'antd';

const { Option } = Select;

function Filter({ onApplyFilter }) {
  const [show, setShow] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Set a default max value
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const {baseUrl} = useBaseUrl();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/categories`);
        console.log(response.data); // Log the response data
        setCategories(response.data.map(category => category.name));

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, [baseUrl]);

  const handleApplyFilter = () => {
    toast(`Category: ${category}, Price Range: $${minPrice} - $${maxPrice}`);
    onApplyFilter({ category, minPrice, maxPrice }); // Pass filter criteria to parent component
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Select
              value={category}
              onChange={(value) => setCategory(value)}
              style={{ width: '100%' }}
              placeholder="Select Category"
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>

          <div className="filter-price">
            <h5>Price Range</h5>
            <div className="price-inputs">
              <label>Min Price:</label>
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
              />
            </div>
            <Slider
              min={0}
              max={1000}
              value={minPrice}
              step={1}
              onChange={(value) => setMinPrice(value)}
            />

            <div className="price-inputs">
              <label>Max Price:</label>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
              />
            </div>
            <Slider
              min={0}
              max={1000}
              value={maxPrice}
              step={1}
              onChange={(value) => setMaxPrice(value)}
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
