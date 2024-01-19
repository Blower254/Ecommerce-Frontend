import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
  // State to hold form data
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: '',
    },
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is an image file, set image preview and update form data
    if (name === 'image' && e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to upload the product
      const response = await axios.post('YOUR_API_ENDPOINT', formData);
      console.log('Product uploaded successfully:', response.data);

      // Clear the form after successful submission
      setFormData({
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
          rate: '',
          count: '',
        },
      });
      setImagePreview('');
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="number" name="id" value={formData.id} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          Image:
          <input type="file" name="image" onChange={handleInputChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        </label>
        <br />

        <label>
          Rating:
          <input type="number" name="rate" placeholder="Rate" value={formData.rating.rate} onChange={(e) => handleInputChange({ target: { name: 'rating', value: { ...formData.rating, rate: e.target.value } } })} />
          <input type="number" name="count" placeholder="Count" value={formData.rating.count} onChange={(e) => handleInputChange({ target: { name: 'rating', value: { ...formData.rating, count: e.target.value } } })} />
        </label>
        <br />

        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;