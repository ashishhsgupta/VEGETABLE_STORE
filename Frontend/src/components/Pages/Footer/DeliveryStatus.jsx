import React, { useEffect, useState } from 'react'
import { PRODUCT_PATH } from '../Router/Router-Constant'
import { Link } from 'react-router-dom'
//import { getAPIData } from '../API/crud-operation'
import axios from 'axios'

const DeliveryStatus = () => {
  const [orderItemStatus, setOrderItemStatus] = useState([])

  //   useEffect(() => {
  //     const fetchOrderItemStatus = 'http://localhost:4002/vegies/v1/api/orderItems'
  //     console.log('Calling API:', fetchOrderItemStatus)
  //     getAPIData(
  //       fetchOrderItemStatus,
  //       false,
  //       response => {
  //         console.log('API Response:', response)
  //         setOrderItemStatus(response)
  //       },
  //       err => {
  //         console.error('Error fetching order item status', err)
  //       }
  //     )
  //   }, [])

  // useEffect(() => {
  //   fetch('http://localhost:4002/vegies/v1/api/orderItems')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('Direct Fetch Data:', data);
  //       setOrderItemStatus(data);
  //     })
  //     .catch(err => console.error('Fetch Error:', err));
  // }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4002/vegies/v1/api/orderItems'
        )
        console.log('Fetched data:', response.data)
        setOrderItemStatus(response.data)
      } catch (error) {
        console.error('Error while fetching order items:', error.message)
      }
    }
    fetchOrderData()
  }, [])

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
            <h5>Check your order status.</h5>

            <div>
              {orderItemStatus.map((item, index) => (
                <p key={index}>{item.order_number}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryStatus
