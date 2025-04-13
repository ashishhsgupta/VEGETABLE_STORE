import React from 'react'
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from 'react-bootstrap/Carousel'

const Producthome = () => {
  const images = [
    {
      url: 'https://t4.ftcdn.net/jpg/00/62/32/69/240_F_62326928_tCOfJ6QDSsLuWSnzjV1PB9HitOUY0xUj.jpg',
      caption: 'Fresh Tomatoes'
    },
    {
      url: 'https://as2.ftcdn.net/v2/jpg/03/80/92/63/1000_F_380926360_EuVQC1NsK5ZsN7A6c7l2M2ViczkQ2tI7.jpg',
      caption: 'Organic Onions'
    },
    {
      url: 'https://as1.ftcdn.net/v2/jpg/04/60/35/96/1000_F_460359613_XPekKlmgsCbsGrg67s3wB9lOI5x2hvKG.jpg',
      caption: 'Golden Potatoes'
    },
    {
      url: 'https://as2.ftcdn.net/v2/jpg/00/10/51/71/1000_F_10517173_PUnHmOJ1VPx2XxQiUPzoytyOuLb6VPWk.jpg',
      caption: 'Fresh vegetables'
    },
    {
      url: 'https://as2.ftcdn.net/v2/jpg/04/78/82/65/1000_F_478826522_eRMBEdVH7iKUw5DXNcJ4WtpIBFZaokHx.jpg',
      caption: 'Fresh Green Vegies'
    }
  ]

  return (
    <>
      <div style={{ width: '', height: '' }}>
        <Carousel>
          {images.map((img, index) => (
            <Carousel.Item
              key={index}
              fade
              interval={2500}
              controls={true}
              indicators={true}
            >
              <img
                className='d-blocks w-100'
                src={img.url}
                alt={img.caption}
                style={{ height: '350px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h5>{img.caption}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default Producthome
