import React from 'react'
import Filter from '../Filter/Filter'
import SearchBar from '../Search/SearchBar'
import './controllers.css'
function FiltersSection() {
  return (
    <div className='controllers-component'>
      <div>
        <Filter/>
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default FiltersSection;
