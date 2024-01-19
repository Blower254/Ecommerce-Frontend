import React, { useState } from 'react';
import './SearchBar.css'; // Import your CSS file for styling
import { IoMdSearch } from "react-icons/io";
import { toast } from 'react-toastify';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    toast(`Searching for: ${searchTerm}`);
    // You can perform further actions, such as sending the search term to a server or filtering data.
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      <button className='search-button'><IoMdSearch  onClick={handleSearch} className="search-icon"/></button>
      
      
    </div>
  );
}

export default SearchBar;
