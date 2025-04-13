import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import '../Header/Header.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  selectedCartItems,
  selectSearchItem
} from '../Redux/counterSlice/cartSlice'

const Product = () => {
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState('')
  const [product, setProduct] = useState([])

  const dispatch = useDispatch()
  const cart = useSelector(selectedCartItems)
  const searchTerm = useSelector(selectSearchItem)

  const filteredItems = product.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/vegies/v1/api/products`
        )
        setProduct(res.data)
      } catch (err) {
        console.error('Error fetching data from API', err.message)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole')
    if (storedRole) {
      setUserRole(storedRole)
    } else {
      setUserRole('')
    }
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleUpdateProduct = product => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleAddToCart = item => {
    const itemExists = cart.some(cartItem => cartItem.item_id === item.item_id)
    if (itemExists) {
      toast.warning('Item already in cart', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      })
    } else {
      dispatch(addToCart(item))
      toast.success('Item added to cart', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      })
    }
  }

  const handleSaveChanges = async () => {
    try {
      const payload = {
        ...selectedProduct,
        item_price: Number(selectedProduct.item_price?.toString().trim())
      }
      const response = await axios.put(
        `http://localhost:4002/vegies/v1/api/products/${selectedProduct.item_id}`,
        payload
      )
      console.log('Payload being sent:', payload)
      console.log('Item ID:', selectedProduct.item_id)
      alert('Product updated successfully')
      setShowModal(false)

      const updatedProducts = await axios.get(
        `http://localhost:4002/vegies/v1/api/products`
      )
      setProduct(updatedProducts.data)
    } catch (err) {
      console.error('Full error:', err.response?.data || err.message)
      alert('Failed to update product')
    }
  }

  return (
    <>
      <div className='bg-light p-4'>
        <ToastContainer />
        <div className='container mt-4- bg-light homeContainer'>
          <div className='row justify-content-center imgContainer'>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.item_id} className='col-2 homeItems'>
                  <img
                    src={item.item_img}
                    alt='img'
                    className='img-fluid homeImg'
                  />
                  <h5 className='text-centered'>{item.item_name}</h5>
                  <p className='itemDes'>{item.item_description}</p>
                  <p className='stockQuantity'>
                    <strong>Total quantity: {item.stock_quantity}</strong>
                  </p>
                  <button type='button' className='btn btn-warning'>
                    ₹ {item.item_price} / 500g
                  </button>
                  &nbsp;
                  <button
                    onClick={() => {
                      if (!userRole) {
                        alert('Login is required')
                        return
                      }
                      if (userRole === 'Admin') {
                        handleUpdateProduct(item)
                      } else {
                        handleAddToCart(item)
                      }
                    }}
                    type='button'
                    className='btn btn-primary'
                  >
                    {userRole === 'Admin' ? 'Edit-Item' : 'ADD'}
                  </button>
                </div>
              ))
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size='lg'>
        <Modal.Header className='bg-warning text-dark px-3 pt-0'>
          <Modal.Title>
            <p className='m-0'>Update your items</p>
          </Modal.Title>
          <FaTimes onClick={handleClose} className='modalBtn' />
        </Modal.Header>
        <Modal.Body>
          <div>
            {selectedProduct ? (
              <div className='d-flex border rounded-1 p-1 bg modalContainer w-100'>
                <div className='productModalImg'>
                  <img
                    src={selectedProduct.item_img}
                    alt='img'
                    className='img-fluid productImg border rounded-1'
                  />
                  <h5 className='text-center mt-2 bg-warning text-dark rounded-1 border border-dark p-1'>
                    {selectedProduct.item_name}
                  </h5>
                  <marquee className='text-danger'>
                    Update the inventory based on availability your item stocks
                  </marquee>
                  <hr />
                </div>
                <div className='productModalContent pt-2'>
                  <p>
                    <strong>Item ID: {selectedProduct.item_id}</strong>{' '}
                  </p>
                  <hr />
                  <div className='form-group mb-2'>
                    <label>
                      <strong>Item description:</strong>
                    </label>
                    <textarea
                      className='form-control'
                      value={selectedProduct.item_description}
                      onChange={e =>
                        setSelectedProduct({
                          ...selectedProduct,
                          item_description: e.target.value
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>
                      <strong>Stock quantity (500g /count):</strong>
                    </label>
                    <input
                      type='number'
                      className='form-control mb-2'
                      value={selectedProduct.stock_quantity}
                      onChange={e =>
                        setSelectedProduct({
                          ...selectedProduct,
                          stock_quantity: e.target.value
                        })
                      }
                    />
                    <label>
                      <strong>Item price / 500g:</strong>
                    </label>
                    <input
                      type='number'
                      className='form-control mb-2'
                      value={selectedProduct.item_price}
                      onChange={e =>
                        setSelectedProduct({
                          ...selectedProduct,
                          item_price: e.target.value
                        })
                      }
                    />
                  </div>
                  <button
                    className='btn btn-success form-control'
                    onClick={handleSaveChanges}
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <p>No product selected</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Product
