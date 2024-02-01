import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css'; // Import your external CSS file
import {useBaseUrl } from '../../BaseUrlContext';
function Category() {
  const [categories, setCategories] = useState([]);
  const {baseUrl} = useBaseUrl();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/categories`);
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, [baseUrl]);

  return (
    <div className="category-container">
      {categories.map(category => (
        <div key={category.id} className="card rounded-4">
          <img src={category.image} className="card-img-top img-fluid" alt={category.name} />
          <div className="card-body">
            <h5 className="card-title">{category.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;
