import React from 'react'
import FiltersSection from '../FiltersSection'
import Products from '../Products'
import './ProductsPage.css'
function ProductsPage() {
  return (
    <div className='productslist-component'>
        <div>
          <FiltersSection/>
        </div>
        <div className='products-section'>
            <Products/>
        </div>

    </div>
  )
}

export default ProductsPage