import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PRODUCT_PATH } from '../Router/Router-Constant';
import { clearCart } from '../Redux/counterSlice/cartSlice';

const OrderItem = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate('');
  const items = useSelector(state => state.cart.items)
  const totalPrice = useSelector(state => state.cart.totalPrice)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, address } = formData;
    if ((!name.trim() || !phone.trim() || !address.trim())) {
      setError('All fields are required')
      return;
    }
    try {
      const userDetails = { name, phone, address };
      const selectedItems = items.map(item => ({
        productId: item.item_id,
        quantity: item.quantity,
        weight:item.weight
      }));
      console.log('req sent to backend:', {
        user: userDetails,
        items: selectedItems,
      });

      const response = await axios.post(
        'http://localhost:4002/vegies/v1/api/orderItems',
        {
          user: userDetails,
          items: selectedItems,
        }
      );
      alert(`Order placed successfully! order No: ${response.data.orderNumber}`)
      dispatch(clearCart());
      setError('');
      navigate(PRODUCT_PATH);
      //window.location.reload(); 
      
    } catch (error) {
      console.error(
        'Error placing order:',
        error?.response?.data?.message || error.message || 'unknown error'
      );
      alert('Failed to place order:' + (error?.response?.data?.message || error.message || 'unknown error'));
    }
  };

  return (
    <>
      <div className='orderItemMain m-4 p-4 bg-light border rounded'>
        <div className='orderItemContainer w-100 d-flex'>
          <div className='orderItemTable w-50 me-2 bg-light border'>
            <h5 className='bg-primary text-light p-3'>
              Selected item details.
            </h5>
            {items.lenght === 0 ? (
              <p>No items selected</p>
            ) : (
              <div
                className='orderTableContainer'
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                <table className='table table-striped border- rounded-'>
                  <thead
                    className='table-primary'
                    style={{ position: 'sticky', top: 0 }}
                  >
                    <tr>
                      <th>Sr.no.</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price /500g</th>
                      <th>Weight</th>
                      <th>Subtotal Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.item_id}>
                        <td>{index + 1}</td>
                        <td>{item.item_name}</td>
                        <td className='text-center'>{item.quantity}</td>
                        <td className='text-center'>{item.item_price}</td>
                        <td className='text-center'>
                          {(item.weight ?? 0) < 1000
                            ? `${item.weight ?? 0}g`
                            : `${(item.weight / 1000).toFixed(2)} kg`}
                        </td>
                        <td className='text-center'>
                          ₹{item.item_price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='orderItemAddress w-50 ms-2 border roundedd bg-white'>
            <h5 className='bg-primary text-light p-3'>
              Enter your delivery address.
            </h5>
            <div className='p-2'>
              <form className='lh-lg' onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='inputName4'>
                      <strong>
                        Name<span className='text-danger'>*</span>
                      </strong>
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='form-control bg-light'
                      id='inputEmail4'
                      placeholder='Enter your name'
                    />
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='inputPhone4'>
                      <strong>
                        Phone no.<span className='text-danger'>*</span>
                      </strong>
                    </label>
                    <input
                      type='number'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className='form-control bg-light'
                      id='inputPhone4'
                      placeholder='Enter your phone no.'
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='inputAddress'>
                    <strong>
                      Address<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <textarea
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputAddress'
                    placeholder='Enter your delivery address with pincode.'
                  />
                </div>
                {error && (
                  <div className='text-danger mt-2 text-center'>{error}</div>
                )}
                <div className='text-center mt-4'>
                  <button className='btn btn-warning fw-bold'>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderItem
