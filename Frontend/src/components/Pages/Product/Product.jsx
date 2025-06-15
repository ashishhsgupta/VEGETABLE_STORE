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
  selectSearchItem,
  increaseItem, decreaseItem
} from '../Redux/counterSlice/cartSlice'
import ViewMore from '../import-pages/ViewMore';

const ITEM_PER_LOAD = 6

const Product = () => {
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState('')
  const [product, setProduct] = useState([])
  const [start, setStart] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  // const [visibleDiscountCount, setVisibleDiscountCount] = useState()
  const [addedToCartItem, setAddedToCartItem] = useState([])
  const cartItems = useSelector(state => state.cart.items);

  const dispatch = useDispatch()
  const cart = useSelector(selectedCartItems)
  const searchTerm = useSelector(selectSearchItem)
  

  const filteredItems = product.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [error, setError] = useState('')
  const [addProductData, setAddProductData] = useState({
    itemId: '',
    itemCategory: '',
    itemName: '',
    itemImgLink: '',
    itemDescription: '',
    itemPrice: '',
    itemStockQuantity: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const isNumberField = ['itemId', 'itemPrice', 'itemStockQuantity'].includes(
      name
    )
    setAddProductData(prev => ({
      ...prev,
      [name]: isNumberField ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const handleSubmit = async e => {
    console.log('Error while click:', handleSubmit)
    e.preventDefault()
    const {
      itemId,
      itemCategory,
      itemName,
      itemImgLink,
      itemDescription,
      itemPrice,
      itemStockQuantity
    } = addProductData

    console.log('Submitted values:', addProductData)

    if (
      addProductData.itemId === '' ||
      isNaN(addProductData.itemId) ||
      addProductData.itemPrice === '' ||
      isNaN(addProductData.itemPrice) ||
      addProductData.itemStockQuantity === '' ||
      isNaN(addProductData.itemStockQuantity === '') ||
      !itemCategory.trim() ||
      !itemName.trim() ||
      !itemImgLink.trim() ||
      !itemDescription.trim()
    ) {
      setError('All fields are required')
      return
    }
    console.log('Error while click:', handleSubmit)
    try {
      const res = await axios.post(
        'http://localhost:4002/vegies/v1/api/products',
        [
          {
            item_id: Number(addProductData.itemId),
            item_category: addProductData.itemCategory.trim(),
            item_name: addProductData.itemName.trim(),
            item_img: addProductData.itemImgLink.trim(),
            item_description: addProductData.itemDescription.trim(),
            item_price: Number(addProductData.itemPrice),
            stock_quantity: Number(addProductData.itemStockQuantity)
          }
        ]
      )

      console.log('itemId value:', addProductData.itemId)
      setError('')
      alert('Product added successfully.')
      handleClose()
      setAddProductData({
        itemId: '',
        itemCategory: '',
        itemName: '',
        itemImgLink: '',
        itemDescription: '',
        itemPrice: '',
        itemStockQuantity: ''
      })
      setProduct([])
      setStart(0)
      setHasMore(true)
      fetchProducts(0)
      console.log('Product submitted, closing modal now')
    } catch (error) {
      console.error(
        'Error white insert product:',
        error.response?.data || error.message
      )
      if (error.response?.status === 409) {
        alert('Item ID already exist, pls use a different ID.')
      } else {
        setError(error.response?.data?.message || 'Something went wrong!')
      }
    }
  }

  const fetchProducts = async (startIndex = start) => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const res = await axios.get(
        'http://localhost:4002/vegies/v1/api/products',
        {
          params: {
            start: startIndex,
            limit: ITEM_PER_LOAD
          }
        }
      )

      const data = res.data

      if (data.length < ITEM_PER_LOAD) {
        setHasMore(false)
      }
      if (startIndex === 0) {
        setProduct(data)
      } else {
        setProduct(prev => [...prev, ...data])
      }
      setStart(prev => startIndex + ITEM_PER_LOAD)
    } catch (err) {
      console.error('Error fetching products:', err.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const doHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight + 100 >= doHeight) {
        fetchProducts()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, isLoading])

  // useEffect(() => {
  //   const phone = localStorage.getItem('userPhone');
  //   if (phone) {
  //     const savedCart = JSON.parse(localStorage.getItem(`cart_${phone}`));
  //     if (savedCart) {
  //       dispatch(addToCart(savedCart));
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole')
    if (storedRole) {
      setUserRole(storedRole)
    } else {
      setUserRole('')
    }
  }, [])

  const handleUpdateProduct = product => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setShowAddProductModal(false)
  }

  const handleAddProduct = () => {
    setShowAddProductModal(true)
  }

  const handleAddToCart = item => {
    if (item.stock_quantity === 0) {
      toast.error('Item is out of stock', {
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
      return
    }

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
        discount: selectedProduct.discount,
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

  const handleDeleteProduct = async itemId => {
    const isConfirmed = window.confirm(
      'Are you sure want to delete this Product?'
    )
    if (!isConfirmed) return
    try {
      const res = await axios.delete(
        `http://localhost:4002/vegies/v1/api/deleteProduct/${itemId}`
      )
      console.log('delete product:', res.data)
      alert('Product deleted successfully')
      window.location.reload()
    } catch (error) {
      console.error('Error while delete item', error.message)
      alert('Failed to delete product.')
    }
  }

  return (
    <>
      <div className='bg-light p-4'>
        <ToastContainer />
        <div className='container mt-4- bg-light homeContainer'>
          <div className='row justify-content-center imgContainer'>
            <div className='mt-2 ms-3'>
              {userRole === 'Admin' && (
                <button
                  className='btn btn-primary text-end'
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              )}
            </div>
          <>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => {
                
                const cartItem = cartItems.find(ci => ci.item_id === item.item_id);
                

                return (
                <div key={item.item_id} className='col-md-3'>
                  <div className='homeItems mb-4 position-relative'>
                    <img
                      src={item.item_img}
                      alt='img'
                      className='img-fluid homeImg'
                    />
                    {item.discount && (
                      <span className='blinking-discount position-absolute top-0 start-0 bg-warning text-dark px-2 py-1 rounded-end fw-bold'>
                        ⭐{item.discount ?? 0}% OFF
                      </span>
                    )}
                    <h5 className='text-centered productName'>
                      {item.item_name}
                    </h5>
                    {/* <p className='itemDes'>{item.item_description}</p> */}
                    <ViewMore text={item.item_description} maxLength={10}/>
                    <p className='mt-2'>
                      <strong>Item ID: {item.item_id}</strong>
                    </p>
                 {userRole === 'Admin' && (
                    <p className='stockQuantity'>
                        <strong>
                          Stock quantity: {item.stock_quantity ?? 0}
                        </strong>
                      </p>
                 )}
                    <h6 className='bg-primary text-center p-1 text-white productQty'>
                      ₹ {item.item_price} / 500g
                    </h6>
                    <br />
                    &nbsp;
                    {userRole !== 'Admin' &&
                    addedToCartItem.includes(item.item_id) ? (
                      <div className='cartContent d-flex justify-content-center gap-2'>
                        <button
                          onClick={() => {dispatch(decreaseItem({item_id: item.item_id}));

                        const updatedCartItem = cartItems.find(ci => ci.item_id === item.item_id);

                          if(!updatedCartItem || updatedCartItem.quantity <= 1){
                            setAddedToCartItem(prev => prev.filter(id => id !== item.item_id));
                          }
                        }
                        }
                          className='btn btn-light border fs-6'
                        >
                          <strong>-</strong>
                        </button>
                        <button className='btn btn-light border fs-6'>
                          <strong>Count:{cartItem?.quantity ?? 0}</strong>
                         
                        </button>
                        
                        <button
                          onClick={() => dispatch(increaseItem(item))}
                          className='btn btn-light border fs-6'
                        >
                          <strong>+</strong>
                        </button>
                      </div>
                    ) : (
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
                            setAddedToCartItem(prev => [...prev, item.item_id])
                          }
                        }}
                        type='button'
                        className='btn btn-warning me-2 buttonItem'
                      >
                        {userRole === 'Admin' ? 'EDIT' : 'ADD TO CART'}
                      </button>
                    )}  
                    {userRole === 'Admin' && (
                      <button
                        onClick={() => handleDeleteProduct(item.item_id)}
                        type='button'
                        className='btn btn-danger'
                      >
                        DELETE
                      </button>
                    )} 
                  </div>
                </div>
                  );
              })
            ) : (
              <span></span>
            )}
            </>
            {isLoading && (
              <div className='text-center my-4'>Loading more...</div>
            )}
            {!hasMore && (
              <div className='text-center my-4 text-grey-500'>
                No more products
              </div>
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
                  <div className='d-flex justify-content-between py-2 fw-bold'>
                    <div>Add Discount</div>
                    <div className=''>
                      <select
                        value={selectedProduct.discount || ''}
                        onChange={e =>
                          setSelectedProduct({
                            ...selectedProduct,
                            discount: e.target.value
                          })
                        }
                        className='form-select bg-info text-dark w-auto'
                      >
                        <option value=''>select</option>
                        <option value='0'>0%</option>
                        <option value='5'>5%</option>
                        <option value='8'>8%</option>
                        <option value='9'>9%</option>
                        <option value='10'>10%</option>
                        <option value='15'>15%</option>
                        <option value='20'>20%</option>
                      </select>
                    </div>
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

      <Modal show={showAddProductModal} onHide={handleClose} size='lg'>
        <Modal.Header className='bg-warning p-2'>
          <Modal.Title>
            <p>Add a new product.</p>
          </Modal.Title>
          <FaTimes onClick={handleClose} className='modalBtn' />
        </Modal.Header>
        <Modal.Body>
          <div className='addProductContainer border rounded p-2'>
            <form className='lh-lg' onSubmit={handleSubmit}>
              <div className='row'>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputName4'>
                    <strong>
                      Item ID<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='number'
                    name='itemId'
                    value={addProductData.itemId}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputItem4'
                    placeholder='Enter new item ID'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputPhone4'>
                    <strong>
                      Item Category<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='text'
                    name='itemCategory'
                    value={addProductData.itemCategory}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputCategory4'
                    placeholder='Enter item category'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputPhone4'>
                    <strong>
                      Item name<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='text'
                    name='itemName'
                    value={addProductData.itemName}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputName4'
                    placeholder='Enter item name'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputPhone4'>
                    <strong>
                      Item img link<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='text'
                    name='itemImgLink'
                    value={addProductData.itemImgLink}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputImgLink4'
                    placeholder='Enter item img link'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputPhone4'>
                    <strong>
                      Item description<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='text'
                    name='itemDescription'
                    value={addProductData.itemDescription}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputDescription4'
                    placeholder='Enter item description'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputPhone4'>
                    <strong>
                      Item price<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='number'
                    name='itemPrice'
                    value={addProductData.itemPrice}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputPrice4'
                    placeholder='Enter item price'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputPhone4'>
                    <strong>
                      Item stock quantity<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='number'
                    name='itemStockQuantity'
                    value={addProductData.itemStockQuantity}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputStockQuantity4'
                    placeholder='Enter item stock quantity'
                  />
                </div>
              </div>

              {error && (
                <div className='text-danger mt-2 text-center'>{error}</div>
              )}

              <div className='d-flex justify-content-center mt-2'>
                <button type='submit' className='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Product
