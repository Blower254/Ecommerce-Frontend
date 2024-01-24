import React from 'react'
import './Loading.css'
function Loading() {
  return (
    <div className='LoadingContainer'>
      <div className='LoadingPopup'>
        <div className="spinner-grow" role="status">
        </div>
      </div>
    </div>
  )
}

export default Loading