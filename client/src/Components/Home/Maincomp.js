
import React, { useEffect } from 'react'
import Banner from './Banner'
import "./home.css";
import Slide from './Slide';
import bg1jpg from './bg1.jpg';
import { getProducts } from '../Redux/Actions/action';
import {useDispatch,useSelector} from "react-redux";

const Maincomp = () => {

  const {products} = useSelector(state => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);


  return (
    <div className='home_section'>
      <div className='banner_part'>
        <Banner />
      </div>
      <div className='slide_part'>
        <div className='left_slide'>
          <Slide title="Deal Of The Day" products={products} />
        </div>
        <div className='right_slide'>
          <h4>OFFERS</h4>
          <img src={bg1jpg} alt='nope'></img>
          <a href='q'>See More</a>
        </div>
      </div>
      <Slide title="Today's Deal" products={products}/>
        <div className='center_img'>
          <img src={bg1jpg} alt='' width="100%" height="300"/>
        </div>
      <Slide title="Better Seller" products={products}/>
      <Slide title="UpTo 80%" products={products}/>
    </div>
  )
}

export default Maincomp