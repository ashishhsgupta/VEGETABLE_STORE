import React from 'react'
import { PRODUCT_PATH } from '../Router/Router-Constant'
import { Link } from 'react-router-dom'

const DeliveryStatus = () => {
  return (
    <div className=''>
      <h5 className='ms-4 mt-2 text-primary'>
        <Link to={PRODUCT_PATH} className='text-decoration-none text-danger'>
          HOME
        </Link>{' '}
        / Delivery status
      </h5>
      <div className='bg-light border rounded m-4 p-4'>
        <div className='container'>
      <div>
        <h5>Will be launched soon.</h5>
      </div>
    </div>
    </div>
    </div>
  )
}

export default DeliveryStatus
