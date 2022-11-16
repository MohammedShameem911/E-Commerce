import React from 'react'
import "./newnav.css";

const newnav = () => {
  return (
    <div className='new_nav'>
        <div className='nav_data'>
            <div className='left_data'>
                <p>Electronics</p>
                <p>Mobiles</p>
                <p>Home Appliances</p>
                <p>Medicine</p>
                <p>Clothings</p>
                <p>FootWear</p>
                <p>Watches</p>
                <p>Accesories</p>
                <p>Laptops</p>
            </div>
            <div className='right_data'>
                 {/*<img src="" alt="" />*/}
            </div>
        </div>
    </div>
  )
}

export default newnav