import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectedCartItems,
  removeProduct,
  clearCart,
  increaseItem,
  decreaseItem,
  selectSearchItem
} from '../Redux/counterSlice/cartSlice'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import imgSrc from '../images/cartClear.png'
import { ORDER_ITEMS_PATH, PRODUCT_PATH } from '../Router/Router-Constant'

const AddedCartproduct = ({ item }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItem = useSelector(selectedCartItems)
  const searchTerm = useSelector(selectSearchItem)

  const handleOrderItems = () => {
    const hasInvalidQuantity = cartItem.some(item => Number(item.quantity) <= 0)

    if (hasInvalidQuantity) {
      alert(
        '(Item quantity must be more than 0),add quantity to all selected cart items.'
      )
    } else {
      navigate(ORDER_ITEMS_PATH)
    }
  }

  const handleRemove = item => {
    dispatch(removeProduct(item))
  }

  const filteredItems = cartItem.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEmptyCart = () => {
    navigate(PRODUCT_PATH)
  }

  return (
    <>
      <div className='bg-light p-4'>
        <ToastContainer />
        <div className='cartProductContainer row bg-white border rounded me-md-4 ms-md-4 p-4'>
          {cartItem.length === 0 && (
            <>
              <div className='clearCart'>
                <h3 className='text-primary'>Your cart is empty</h3>
                <img
                  src={imgSrc}
                  alt='img'
                  className='img-fluid'
                  style={{ width: '300px', height: '200px' }}
                />
                <div>
                  <button
                    onClick={handleEmptyCart}
                    className='btn btn-warning mt-4 w-25 fs-5'
                  >
                    Continue your shopping...
                  </button>
                </div>
              </div>
            </>
          )}
          {filteredItems.map(item => (
            <div
              key={item.item_id}
              className='cartProductKey col-5 border rounded p-2 text-center mb-4 bg-white'
            >
              <div className='cartContainerDisplay d-flex w-100'>
                <div className='cartContainerImg p-2 w-50 me-2'>
                  <img
                    src={item.item_img}
                    className='img-fluid cartImg border rounded mb-4'
                    style={{ width: '400px', height: '250px' }}
                  />
                  <div className='cartContent'>
                    <button
                      onClick={() =>
                        dispatch(decreaseItem({ item_id: item.item_id }))
                      }
                      className='btn btn-light border fs-6'
                    >
                      <strong>-</strong>
                    </button>
                    <button className='btn btn-light border fs-6'>
                      <strong>Total count: {item.quantity ?? 0}</strong>
                    </button>
                    <button
                      onClick={() => dispatch(increaseItem(item))}
                      className='btn btn-light border fs-6'
                    >
                      <strong>+</strong>
                    </button>
                  </div>
                </div>
                <div className='cartProductContent w-50'>
                  <p>
                    <strong>Category: {item.item_category}</strong>
                  </p>
                  <span>
                    <strong>{item.item_name}</strong>
                  </span>
                  <p>{item.item_description}</p>
                  <h6 className='opacity-75'>
                    Stock is limited. Free delivery on orders of Rs 500.
                  </h6>
                  <p>
                    <strong>Item Price: {item.item_price} /500g</strong>
                  </p>
                  <div className='bg-primary text-light m-4'>
                    <strong>
                      Total price:{' '}
                      {(item.quantity ?? 0) * (item.item_price ?? 0)} , Wt. :{' '}
                      {(item.weight ?? 0) < 1000
                        ? `${item.weight ?? 0}g`
                        : `${(item.weight / 1000).toFixed(2)} kg`}
                    </strong>
                  </div>
                 <span
                    onClick={() => handleRemove(item)}
                    className='removeItem'
                  >
                    <i>Remove</i>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className='productClearOrderBtn position-relative d-flex'>
            <div className='text-center'>
              {cartItem.length !== 0 && (
                <button
                  onClick={() => {
                    dispatch(clearCart())
                    toast.success('Cart Cleared', {
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
                  }}
                  className='btn btn-warning'
                >
                  <strong>Clear Cart</strong>
                </button>
              )}
            </div>
            <div>
              {cartItem.length !== 0 && (
                <button onClick={handleOrderItems} className='btn btn-success'>
                  <strong>Save & Proceed</strong>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddedCartproduct
