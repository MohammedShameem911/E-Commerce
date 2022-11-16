import { Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import './Cart.css';
import { LoginContext } from '../context/ContextProvider';

const Cart = () => {


    const { id } = useParams("");
    // console.log(id);

    const history = useNavigate("");

    const {account,setAccount} = useContext(LoginContext);

    const [inddata, setInddata] = useState([]);
    console.log(inddata);

    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        //console.log(data);


        if (res.status !== 201) {
            console.log("no data available");
        }
        else {
            console.log("getdata");
            setInddata(data);
        }
    }

    useEffect(() => {
        getinddata();
    }, [id]);


    //add cart
    const addcart = async (id) => {
        const checkres = await fetch(`/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inddata
            }),
            credentials: "include"
        });

        const data1 = await checkres.json();
        console.log(data1 + "frontend data");

        if(checkres.status === 401 || !data1){
            console.log("user invalid");
            alert("invalid");
        }
        else{
           // alert("data added");
           history("/buynow");
            setAccount(data1)
        }
    }


    return (
        <div className='cart_section'>
            {inddata && Object.keys(inddata).length &&
                <div className='cart_container'>
                    <div className='left_cart'>
                        <img src={inddata.detailUrl} alt="cart img" />
                        <div className='cart_btn'>
                            <button className='cart_btn1' onClick={() => addcart(inddata.id)}>Add To Cart</button>
                            <button className='cart_btn2'>Buy Now</button>
                        </div>
                    </div>
                    <div className='right_cart'>
                        <h3>{inddata.title.longTitle}</h3>
                        <h4>{inddata.title.shortTitle}</h4>
                        <Divider />
                        <p className='mrp'>MRP : ${inddata.price.mrp}</p>
                        <p>Deal Of The Day : <span style={{ color: "#B12704" }}>${inddata.price.cost}</span></p>
                        <p>You Save : <span style={{ color: "#B12704" }}>${inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span></p>

                        <div className='discount_box'>
                            <h5>Discount : <span style={{ color: "#111" }}>{inddata.discount}</span></h5>
                            <h4>Free Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow </span> Details</h4>
                            <p>Fastest Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11Am</span></p>
                        </div>
                        <p className='description'>About The Item : <span style={{ color: "#565959", fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
                </div>
            }
        </div>

    )
};

export default Cart