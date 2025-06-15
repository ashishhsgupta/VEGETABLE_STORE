import React from 'react'
import { Link } from 'react-router-dom'
import { PRODUCT_PATH } from '../Router/Router-Constant'
import customerSupport from '../images/customer_support.png'
import mobile from '../images/mobile_app.png'
import mail from '../images/mail.png'

const Support = () => {
  return (
    <div className=''>
      <h5 className='ms-4 mt-2 text-primary'>
        <Link to={PRODUCT_PATH} className='text-decoration-none text-danger'>
          HOME
        </Link>{' '}
        / Customer-support
      </h5>
      <div className='bg-light border rounded m-4 p-4'>
        <div className='container'>
          <div className='mb-4 supportPara'>
            <h4>How can we help?</h4>
            <p>
              At Country Delight, we make sure all our customers concerns raised
              are addressed timely. Our dedicated team of customer care
              specialists work round the clock to resolve all issues
              satisfactorily. However if you wish to escalate any matter click
              here.
            </p>
            <div className='w-90 d-flex justify-content-around'>
              <div
                className='d-flex align-items-center justify-content-around'
                style={{ width: '90%' }}
              >
                <div className='custSupport text-center'>
                  <img
                    src={customerSupport}
                    alt='support'
                    className='img-fluid mb-4'
                    style={{ width: '50px' }}
                  />
                </div>

                <div className=' flex-grow-1 mx-2 dashed-line'></div>

                <div className='custSupport text-center'>
                  <img
                    src={mobile}
                    alt='support'
                    className='img-fluid mb-4'
                    style={{ width: '30px' }}
                  />
                </div>
                <div className='flex-grow-1 mx-2 dashed-line'></div>

                <div className='custSupport text-center'>
                  <img
                    src={mail}
                    alt='support'
                    className='img-fluid mb-4'
                    style={{ width: '50px' }}
                  />
                </div>
              </div>
            </div>
            <div className='w-100 d-flex justify-content-around'>
              <div className='w-50'>
                <h5>Customer support helpline</h5>
                <h6>(6AM to 9PA everyday)</h6>
              </div>
              <div className='w-50 text-center'>
                <h5>Countrydelight mobile app</h5>
                <p>
                  Give feedback through country delight mobile application,
                  closure of complaints raised through this medium takes 24
                  hours.
                </p>
              </div>
              <div className='w-50 text-end'>
                <h5>info@vegebasket.com</h5>
              </div>
            </div>
          </div>

          <div className='supportPara'>
            <h4>Escalation Matrix</h4>
            <p>
              At any point. in case of an unsatisfacatory resolution, customer
              can follow the escalation matrix.
            </p>
            <div className='w-90 d-flex justify-content-around'>
              <div
                className='d-flex align-items-center justify-content-around'
                style={{ width: '90%' }}
              >
                <div className='custSupport text-center'>
                  <strong>Lavel 1</strong>
                </div>

                <div className=' flex-grow-1 mx-2 dashed-line'></div>

                <div className='custSupport text-center'>
                  <strong>Lavel 2</strong>
                </div>
                <div className='flex-grow-1 mx-2 dashed-line'></div>

                <div className='custSupport text-center'>
                  <strong>Lavel 3</strong>
                </div>
              </div>
            </div>
            <div className='w-100 d-flex justify-content-around'>
              <div className='w-50 text-center supportPara'>
                <p>
                  If the customer representative is not able to provide a proper
                  resolution on the issue then the customer can ask transfer of
                  the complaint to the floor manager/team lead.
                </p>
              </div>
              <div className='w-50 text-center supportPara'>
                <p>
                  If even then the customer is not satisfied then he/she can
                  escalate it the customer support head.
                  <br />
                  grievanceofficer@vegebasket.com
                </p>
              </div>
              <div className='w-50 text-center supportPara'>
                <p>
                  If still the problem is not fixed then it can be escalated to
                  Operations Head.
                  <br />
                  nodal@vegebasket.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
