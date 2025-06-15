import React from 'react'
import { PRODUCT_PATH } from '../Router/Router-Constant'
import { Link } from 'react-router-dom'
import faqimg from '../images/faq.png'

const FAQ = () => {
  return (
    <>
      <div className=''>
        <h5 className='ms-4 mt-2 text-primary'>
          <Link to={PRODUCT_PATH} className='text-decoration-none text-danger'>
            HOME
          </Link>{' '}
          / FAQ's
        </h5>
        <div className='bg-light border rounded m-4 p-4'>
          <div className='container'>
            <div>
              <h4>FAQ's(Frequently Asked Question's)</h4>
              <div className='d-flex mb-2'>
                <div className='me-4'>
                  <p>
                    Kindly check the FAQ below if you are not very familiar with
                    the functioning of this website. If your query is of urgent
                    nature and is different from the set of questions then
                    please contact us at: <b>Email:</b>{' '}
                    <Link className='text-decoration-none'>
                      customerservice@vegebasket.com
                    </Link>{' '}
                    <b>Call us: 1234 123 1000</b> Chat with us in-app under
                    customer service /Need Help section from 6 am & 10 pm on all
                    days including Sunday to get our immediate help If you are
                    not satisfied with the resolution provided by us, then
                    please write to our Grievance Officer at{' '}
                    <Link className=''>grievanceofficer@vegebasket.com</Link>
                  </p>
                </div>
                <div className='mb-2'>
                  <img
                    src={faqimg}
                    alt='img'
                    className='img-fluid'
                    style={{ width: '30rem' }}
                  />
                </div>
              </div>
              <div className='accordion' id='faqAccordion'>
                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingOne'>
                    <button
                      className='accordion-button bg-success text-light'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseOne'
                      aria-expanded='true'
                      aria-controls='collapseOne'
                    >
                      <h5>How do I register?</h5>
                    </button>
                  </h2>
                  <div
                    id='collapseOne'
                    className='accordion-collapse collapse show'
                    aria-labelledby='headingOne'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        You can register by clicking on the "Sign Up" link at
                        the top right corner of the homepage. Please provide the
                        information in the form that appears. You can review the
                        terms and conditions, provide your payment mode details
                        and submit the registration information.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingTwo'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseTwo'
                      aria-expanded='false'
                      aria-controls='collapseTwo'
                    >
                      <h5>Are there any charges for registration?</h5>
                    </button>
                  </h2>
                  <div
                    id='collapseTwo'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingTwo'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        No. Registration on bigbasket.com is absolutely free.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingThree'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseThree'
                      aria-expanded='false'
                      aria-controls='collapseThree'
                    >
                      <h5>
                        Do I have to necessarily register to shop on vegebasket?
                      </h5>
                    </button>
                  </h2>
                  <div
                    id='collapseThree'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingThree'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        You can register by clicking on the "Sign Up" link at
                        the top right corner of the homepage. Please provide the
                        information in the form that appears. You can review the
                        terms and conditions, provide your payment mode details
                        and submit the registration information.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingFour'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseFour'
                      aria-expanded='false'
                      aria-controls='collapseFour'
                    >
                      <h5>
                        Can I have different city addresses under one account
                        and still place orders for multiple cities?
                      </h5>
                    </button>
                  </h2>
                  <div
                    id='collapseFour'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingFour'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Yes, you can place orders for multiple cities.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingFive'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseFive'
                      aria-expanded='false'
                      aria-controls='collapseFive'
                    >
                      <h5>What are the modes of payment?</h5>
                    </button>
                  </h2>
                  <div
                    id='collapseFive'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingFive'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        You can pay for your order on bigbasket.com using the
                        following modes of payment:a. Cash on delivery (COD)b.
                        Credit and debit cards (VISA / Mastercard / Rupay)c.
                        Paytm food wallet will be accepted only for food items.
                        If the order has to be left at the security gate, please
                        continue to pay online via wallets, UPI, net banking, or
                        cards as you are doing now. If you choose COD as the
                        payment method, you will need to pay our delivery
                        executive in cash at the time of delivery. To minimize
                        contact, please give the executive the exact amount or
                        the order total rounded up to the nearest hundred. For
                        example, if your order value is Rs.1,235, please pay
                        exactly this amount or Rs.1,300. The executive will not
                        be able to return any change. Any balance due will be
                        credited directly to your bigbasket wallet which you can
                        utilise in your next order. The option is currently
                        available only for bigbasket mobile app users.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingSix'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseSix'
                      aria-expanded='false'
                      aria-controls='collapseSix'
                    >
                      <h5>
                        Is it safe to use my credit/ debit card on vegebasket?
                      </h5>
                    </button>
                  </h2>
                  <div
                    id='collapseSix'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingSix'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Yes it is absolutely safe to use your card on
                        bigbasket.com. A recent directive from RBI makes it
                        mandatory to have an additional authentication pass code
                        verified by VISA (VBV) or MSC (Master Secure Code) which
                        has to be entered by online shoppers while paying online
                        using visa or master credit card. It means extra
                        security for customers, thus making online shopping
                        safer
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingSeven'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseSeven'
                      aria-expanded='false'
                      aria-controls='collapseSeven'
                    >
                      <h5>What is the meaning of cash on delivery?</h5>
                    </button>
                  </h2>
                  <div
                    id='collapseSeven'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingSeven'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Cash on delivery means that you can pay for your order
                        at the time of order delivery at your doorstep.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingEight'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseEight'
                      aria-expanded='false'
                      aria-controls='collapseEight'
                    >
                      <h5>
                        If I pay by credit card how do I get the amount back for
                        items not delivered?
                      </h5>
                    </button>
                  </h2>
                  <div
                    id='collapseEight'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingEight'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        If we are not able to delivery all the products in your
                        order and you have already paid for them online, the
                        balance amount will be refunded to your bigbasket
                        account as store credit and you can use it at any time
                        against your future orders. Should you want it to be
                        credited to your bank account please contact our
                        customer support team and we will refund it back on to
                        your card.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingNine'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseNine'
                      aria-expanded='false'
                      aria-controls='collapseNine'
                    >
                      <h5>When will I receive my order?</h5>
                    </button>
                  </h2>
                  <div
                    id='collapseNine'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingNine'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Once you are done selecting your products and click on
                        checkout you will be prompted to select delivery slot.
                        Your order will be delivered to you on the day and slot
                        selected by you. If we are unable to deliver the order
                        during the specified time duration (this sometimes
                        happens due to unforeseen situations).
                      </strong>
                    </div>
                  </div>
                </div>

                <div className='accordion-item mb-2'>
                  <h2 className='accordion-header' id='headingTen'>
                    <button
                      className='accordion-button bg-success text-light collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseTen'
                      aria-expanded='false'
                      aria-controls='collapseTen'
                    >
                      <h5>How will the delivery be done?</h5>
                    </button>
                  </h2>
                  <div
                    id='collapseTen'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingTen'
                    data-bs-parent='#faqAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        We have a dedicated team of delivery personnel and a
                        fleet of vehicles operating across the city which
                        ensures timely and accurate delivery to our customers.
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQ
