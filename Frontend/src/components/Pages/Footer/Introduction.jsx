import React from 'react'
import introvege from "../images/about_shopbag.png";
import whyvb from "../images/whyvb.png";

const Introduction = () => {
  return (
    <>
    <div className='d-flex justify-content-center'>
        <div className='mt-3 me-4'>
      <h4>What is Veg Basket</h4>
      <p>
        vegebasket.com (Innovative Retail Concepts Private Limited) is India’s
        largest online food and grocery store. With over 18,000 products and
        over a 1000 brands in our catalogue you will find everything you are
        looking for. Right from fresh Fruits and Vegetables, Rice and Dals,
        Spices and Seasonings to Packaged products, Beverages, Personal care
        products, Meats – we have it all. Choose from a wide range of options in
        every category, exclusively handpicked to help you find the best quality
        available at the lowest prices. Select a time slot for delivery and your
        order will be delivered right to your doorstep, anywhere in Bangalore,
        Hyderabad, Mumbai, Pune, Chennai, Delhi, Noida, Mysore, Coimbatore,
        Vijayawada-Guntur, Kolkata, Ahmedabad-Gandhinagar, Lucknow-Kanpur,
        Gurgaon, Vadodara, Visakhapatnam, Surat, Nagpur, Patna, Indore and
        Chandigarh Tricity You can pay online using your debit / credit card or
        by cash / sodexo on delivery. We guarantee on time delivery, and the
        best quality!
      </p>
      </div>
      <div className='introvege'>
        <img src={introvege} className='img-fluid mt-4' alt='img' style={{width:"100rem"}}/>
      </div>
    </div>
    <div className='d-flex justify-content-center'>
   <div className='me-4'>
    <h4>Happy Shopping</h4>
 <h5>Why should I use vegebasket.com?</h5>
 <p>vegebasket.com allows you to walk away from the drudgery of grocery 
    shopping and welcome an easy relaxed way of browsing and shopping 
    for groceries. Discover new products and shop for all your food and
     grocery needs from the comfort of your home or office. No more getting
      stuck in traffic jams, paying for parking, standing in long queues and
       carrying heavy bags – get everything you need, when you need, right at
        your doorstep. Food shopping online is now easy as every product on your
         monthly shopping list, is now available online at vegebasket.com, India’s
          best online grocery store.</p>
   </div>
   <div className=''>
    <img src={whyvb} alt='img' className='img-fluid mt-4' style={{width:"90rem"}}/>
   </div>
    </div>
    </>
  )
}

export default Introduction
