import React, { useState } from 'react'
import { PRODUCT_PATH } from '../Router/Router-Constant'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const ContactUs = () => {
  const [contactModal, setContactModal] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { name, email, subject, description } = formData
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.subject === '' ||
      formData.description === ''
    ) {
      setError('All fields are required')
      return
    }
    alert('Submitted successfully')
    setFormData({
      name: '',
      email: '',
      subject: '',
      description: ''
    })
    setContactModal(false)
  }

  const handleContact = () => {
    setContactModal(true)
  }

  const handleClose = () => {
    setContactModal(false)
  }
  return (
    <>
      <div className=''>
        <h5 className='ms-4 mt-2 text-primary'>
          <Link to={PRODUCT_PATH} className='text-decoration-none text-danger'>
            HOME
          </Link>{' '}
          / Contact Us
        </h5>
        <div className='bg-light border rounded m-4 p-4'>
          <div className='container'>
            <div>
              <h5>Contact Us -</h5>
              <h6>
                To reach our customer service team please email us at:{' '}
                <Link className='text-decoration-none'>
                  customerservice@vegebasket.com
                </Link>
              </h6>
              <hr />
              <p>
                To submit a customer service request{' '}
                <button className='btn btn-link p-0' onClick={handleContact}>
                  click here..
                </button>
              </p>
              <hr />
              <p>
                [All calls to our customer support number 4567-123-1000 will be
                recorded for internal training and quality purposes.]
              </p>
              <hr />
              <h4 className='text-center'>Office Address:</h4>

              <div className='accordion m-4' id='cityAccordion'>
                {/* Delhi */}
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingDelhi'>
                    <button
                      className='accordion-button collapsed bg-success text-light'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseDelhi'
                      aria-expanded='false'
                      aria-controls='collapseDelhi'
                    >
                      Delhi
                    </button>
                  </h2>
                  <div
                    id='collapseDelhi'
                    className='accordion-collapse collapse shows'
                    data-bs-parent='#cityAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Address: Rajpath Marg, New Delhi, Delhi 110011
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Mumbai */}
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingMumbai'>
                    <button
                      className='accordion-button collapsed bg-success text-light'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseMumbai'
                      aria-expanded='false'
                      aria-controls='collapseMumbai'
                    >
                      Mumbai
                    </button>
                  </h2>
                  <div
                    id='collapseMumbai'
                    className='accordion-collapse collapse'
                    data-bs-parent='#cityAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Address: Marine Drive, Mumbai, Maharashtra 400002
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Bengaluru */}
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingBengaluru'>
                    <button
                      className='accordion-button collapsed bg-success text-light'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseBengaluru'
                      aria-expanded='false'
                      aria-controls='collapseBengaluru'
                    >
                      Bengaluru
                    </button>
                  </h2>
                  <div
                    id='collapseBengaluru'
                    className='accordion-collapse collapse'
                    data-bs-parent='#cityAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Address: MG Road, Bengaluru, Karnataka 560001
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Kolkata */}
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingKolkata'>
                    <button
                      className='accordion-button collapsed bg-success text-light'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseKolkata'
                      aria-expanded='false'
                      aria-controls='collapseKolkata'
                    >
                      Kolkata
                    </button>
                  </h2>
                  <div
                    id='collapseKolkata'
                    className='accordion-collapse collapse'
                    data-bs-parent='#cityAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Address: Park Street, Kolkata, West Bengal 700016
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Lucknow */}
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingLck'>
                    <button
                      className='accordion-button collapsed bg-success text-light'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseLck'
                      aria-expanded='false'
                      aria-controls='collapseLck'
                    >
                      Lucknow
                    </button>
                  </h2>
                  <div
                    id='collapseLck'
                    className='accordion-collapse collapse'
                    data-bs-parent='#cityAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Address: Charbagh Street, Lucknow, Uttar Pradesh 226007
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Chennai */}
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingChennai'>
                    <button
                      className='accordion-button collapsed bg-success text-light'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseChennai'
                      aria-expanded='false'
                      aria-controls='collapseChennai'
                    >
                      Chennai
                    </button>
                  </h2>
                  <div
                    id='collapseChennai'
                    className='accordion-collapse collapse'
                    data-bs-parent='#cityAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>
                        Address: Marina Beach Rd, Chennai, Tamil Nadu 600005
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={contactModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton className='bg-primary p-2'>
          <Modal.Title>
            <h4 className='text-light'>Submit customer service request.</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='addProductContainer border rounded p-2'>
            <form className='lh-lg' onSubmit={handleSubmit}>
              <div className='row'>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputName4'>
                    <strong>
                      Name:<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputItem4'
                    placeholder='Enter your name'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputEmail4'>
                    <strong>
                      Email:<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputCategory4'
                    placeholder='Enter your email id'
                  />
                </div>

                <div className='form-group col-md-12'>
                  <label htmlFor='inputSubject4'>
                    <strong>
                      Subject:<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <input
                    type='text'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    className='form-control bg-light'
                    id='inputSubject4'
                    placeholder='Mention subject'
                  />
                </div>

                <div className='form-group col-md-12'>
                  <label htmlFor='inputDescription4'>
                    <strong>
                      Description<span className='text-danger'>*</span>
                    </strong>
                  </label>
                  <textarea
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    className='form-control'
                    rows={4}
                    placeholder='Enter description'
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className='text-danger mt-2 text-center'>{error}</div>
              )}

              <div className='d-flex justify-content-center mt-2'>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ContactUs
