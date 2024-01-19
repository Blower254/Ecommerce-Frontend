import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css'; // Import your external CSS file

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

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
