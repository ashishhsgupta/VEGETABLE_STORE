import { useState } from 'react'
import Introduction from './Introduction'
import PolicyNCircular from './PolicyNCircular'
import TermNCondition from './TermNCondition'
import PerformanceFigure from './PerformanceFigure'
import './Footer.css'
import { Link } from 'react-router-dom'
import { PRODUCT_PATH } from '../Router/Router-Constant'

const About = () => {
  const [activeTab, setActiveTab] = useState('introduction')

  const renderComponent = () => {
    switch (activeTab) {
      case 'introduction':
        return <Introduction />
      case 'performance':
        return <PerformanceFigure />
      case 'terms':
        return <TermNCondition />
      case 'policies':
        return <PolicyNCircular />
    }
  }

  return (
    <div className=''>
      <h5 className='ms-4 mt-2 text-primary'><Link to={PRODUCT_PATH} className='text-decoration-none text-danger'>HOME</Link> / About Us</h5>
      <div className='bg-light border rounded m-4 p-4'>
        <div className='container'>
            <div className='d-flex justify-content-evenly aboutPages'>
          <button id='btn btn-primary btn-top-diagonal'
            onClick={() => setActiveTab('introduction')}
            className={`${activeTab === 'introduction' ? 'active' : ''} aboutBtn` }
          >
            Introduction
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`${activeTab === 'performance' ? 'active' : ''} aboutBtn`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`${activeTab === 'terms' ? 'active' : ''} aboutBtn`}
          >
            Terms and Conditions
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`${activeTab === 'policies' ? 'active' : ''} aboutBtn`}
          >
            Policies
          </button>
</div>
          <div className='border-top border-danger'>{renderComponent()}</div>
        </div>
      </div>
    </div>
  )
}

export default About
