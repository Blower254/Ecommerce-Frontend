import React from 'react'
import Filter from '../../Filter/Filter'
import Products from '../Products'
import './ProductsPage.css'
function ProductsPage() {
  return (
    <div className='productslist-component'>
        <div className='filter-section'>
            <Filter/>
        </div>
        <div className='products-section'>
            <Products/>
        </div>

    </div>
  )
}

export default ProductsPage