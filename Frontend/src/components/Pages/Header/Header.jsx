import React, { useContext, useEffect, useState, memo } from 'react'
import imgURL from '../images/veggie.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaCircleUser } from 'react-icons/fa6'
import { Modal } from 'react-bootstrap'
import TooltipWrapper from '../TooltipWrapper/TooltipWrapper'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import GlobalContext from '../Router/GlobalContext'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectedCartItems,
  selectedCartTotalPrice,
  setSearchItem,
  selectSearchItem
} from '../Redux/counterSlice/cartSlice'
import { ADDED_CART_PRODUCT_PATH } from '../Router/Router-Constant'

const Header = () => {
  const navigate = useNavigate('')

  const dispatch = useDispatch()
  const cartItem = useSelector(selectedCartItems)
  const totalPrice = useSelector(selectedCartTotalPrice)
  const searchTerm = useSelector(selectSearchItem)

  const {
    isLogin,
    setIsLogin,
    phone,
    setPhone,
    role,
    setRole,
    userRole,
    setUserRole
  } = useContext(GlobalContext)
  const [showModal, setShowModal] = useState(false)

  const handleLogin = () => {
    setShowModal(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userPhone')
    localStorage.removeItem('isLogin')
    setIsLogin(false)
    setPhone(null)
    setRole(null)
    setUserRole('')

    alert('logout successfully')
    setTimeout(() => {
      navigate('/')
    }, 100)
    console.log('locastorage after logout:', localStorage.getItem('userRole'))
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const [formdata, setFormData] = useState({
    phone: '',
    otp: ''
  })

  const [otpSent, setOtpSent] = useState(false)

  const [error, setError] = useState({})

  const inputChange = e => {
    const { name } = e.target
    const inputValue = e.target.value.replace(/\D/g, '')
    setFormData({ ...formdata, [name]: inputValue })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const validationError = {}

    if (!formdata.phone.trim()) {
      validationError.phone = 'Please enter your phone number'
    } else if (formdata.phone.trim().length < 10) {
      validationError.phone = 'Phone number should be 10 digits'
    }
    setError(validationError)
    if (Object.keys(validationError).length === 0) {
      try {
        const response = await axios.post(
          `http://localhost:4002/vegies/v1/api/sendOTP`,
          {
            phone: formdata.phone
          }
        )
        console.log('phone:', response)
        if (response.status === 201) {
          setOtpSent(true)
          console.log('OTP send on mo. no.:', formdata.phone)
          alert('OTP send to your Mobile no.')
        }
      } catch (error) {
        console.log('loginpage:', error?.response)
        if (error?.response?.status === 401) {
          alert('Internal error')
        } else {
          alert(
            'Please Enter valid number:',
            +(error?.response?.data?.message || error.message)
          )
        }
      }
    }
  }

  const handleVerifyOtp = async e => {
    e.preventDefault()
    const validationError = {}
    if (!formdata.otp || formdata.otp.trim().length === 0) {
      validationError.otp = 'Please enter the OTP'
    }
    setError(validationError)
    if (Object.keys(validationError).length === 0) {
      try {
        const response = await axios.post(
          `http://localhost:4002/vegies/v1/api/verifyOTP`,
          {
            phone: formdata.phone,
            otp: formdata.otp
          }
        )

        if (response.data.success) {
          const userRole = response.data.role
          setIsLogin(true)
          setPhone(formdata.phone)
          setRole(userRole)
          localStorage.setItem('userRole', userRole)
          localStorage.setItem('userPhone', formdata.phone)
          console.log('Role Set:', response.data.role)
          alert('OTP verified successfully')
          setShowModal(false)
          navigate('/product')
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        console.error('OTP verification error:', error),
          alert(
            error?.response?.data?.message ||
              'Something went wrong while verify OTP'
          )
      }
    }
  }
  return (
    <>
      <div className='containerFluid bg-dark'>
        <div className='col d-flex justify-content-between align-items-center w-100'>
          <div className='row-lg-2'>
            <img
              src={imgURL}
              alt='img'
              className='img-fluid headerTopImg mb-2 mt-2'
            />
          </div>

          <div className='row-lg-2 d-flex'>
            <input
              type='search'
              id='form1'
              className='form-control'
              placeholder='Search items'
              aria-label='Search'
              value={searchTerm}
              onChange={e => dispatch(setSearchItem(e.target.value))}
            />
          </div>
          {role && role.toLowerCase().trim() === 'user' && (
            <>
              <div className='row-lg-2'>
                <button className='btn btn-warning'>
                  <h6>
                    Cart item total price : ₹ {Number(totalPrice).toFixed(2)}
                  </h6>
                </button>
              </div>

              <div className='row-lg-2'>
                <Link to={ADDED_CART_PRODUCT_PATH} className='right'>
                  <button
                    type='button'
                    className='btn btn-primary position-relative'
                  >
                    <span className='material-symbols-outlined'>
                      shopping_cart
                    </span>
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                      {cartItem.length}
                      <span className='visually-hidden'>unread messages</span>
                    </span>
                  </button>
                </Link>
              </div>
            </>
          )}
          <div className='userLogin col-lg-2 text-white position-relative'>
            {isLogin ? (
              <>
                <div className='me-4'>
                  <span className='loginGreet'>Welcome</span>
                  <br />
                  <span>
                    {role ? role : 'role not found'}: {phone}
                  </span>

                  <span
                    className='ml-4'
                    style={{
                      position: 'absolute',
                      margin: '-20px 0px 0px 10px'
                    }}
                  >
                    <TooltipWrapper tooltipText='Logout' placement='bottom'>
                      <FaCircleUser
                        size={40}
                        onClick={handleLogout}
                        style={{ cursor: 'pointer' }}
                      />
                    </TooltipWrapper>
                  </span>
                </div>
              </>
            ) : (
              <>
                <TooltipWrapper tooltipText='Sign-in' placement='bottom'>
                  <span className=''>
                    <FaCircleUser
                      size={40}
                      onClick={handleLogin}
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                </TooltipWrapper>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='homeMarquee'>
        <marquee className=''>
          🌱 Are you craving farm-fresh vegetables straight from nature’s
          bounty? 🌿 Look no further! At <strong>Fresh Vegetable</strong>, we
          bring you the freshest, most nutritious vegetables, grown with care
          and love. ✨
        </marquee>
      </div>
      <Modal show={showModal} onHide={handleClose} size='md' centered>
        <Modal.Header className='position-relative'>
          <Modal.Title>
            <p className='fs-5'>Sign-up/Sign-in with your phone number.</p>
          </Modal.Title>
          <FaTimes onClick={handleClose} className='modalBtn' />{' '}
        </Modal.Header>

        <Modal.Body>
          <div className='row modalHeader'>
            <form onSubmit={otpSent ? handleVerifyOtp : handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='inputEmail' className='form-label'>
                  Enter your phone number
                </label>
                <input
                  type='text'
                  onChange={inputChange}
                  value={formdata.phone}
                  disabled={otpSent}
                  className='form-control'
                  id='inputEmail'
                  name='phone'
                  aria-describedby='phoneNumber'
                  placeholder='Phone no.'
                  maxLength={10}
                />
              </div>
              {otpSent && (
                <div className='mb-3'>
                  <label htmlFor='otpInput' className='form-label'>
                    Enter OTP
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='otpInput'
                    name='otp'
                    value={formdata.otp || ''}
                    onChange={inputChange}
                    placeholder='Enter OTP'
                  />
                </div>
              )}
              <button type='submit' className='form-control btn btn-primary'>
                {otpSent ? 'Verify OTP' : 'Send OTP'}
              </button>
              {error.phone && <div className='error-msg'>{error.phone}</div>}
              {error.otp && <div className='error-msg'>{error.otp}</div>}
              <div className='mb-5 pt-4'>
                By signing up, you agree to our{' '}
                <Link>privacy policy and terms of conditions</Link> of use.
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default memo(Header)
