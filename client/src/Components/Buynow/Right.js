import { useEffect, useState } from "react";
import React from 'react';


const Right = ({item}) => {

  const [price,setPrice] = useState(0);

  useEffect(()=>{
    totalAmount();
  },[item])

const totalAmount = ()=>{
  let price = 0;
  item.map((item)=>{
    price = item.price.cost + price
  });

  setPrice(price)
}

  return (
    <div className='right_buy'>
        <img src="" alt=""/>
        <div className='cost_right'>
            <p>Your Order is eligible for free delivery</p>
            <span style={{color:"#565959"}}>Select This Option At Checkout</span>
            <h3>Subtotal ({item.length} items): <span style={{fontWeight:700}}> ${price}</span></h3>
            <button className='rightbuy_btn'>process To Buy</button>
            <div className='emi'>
                EMI Available
            </div>
        </div>
    </div>
  )
}

export default Right