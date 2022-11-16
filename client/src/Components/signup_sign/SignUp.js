import React, { useState } from 'react'
import {NavLink} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [udata,setUdata] = useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    });

    console.log(udata);

    const adddata = (e)=>{
        const {name,value} = e.target;

        setUdata(()=>{
            return{
                ...udata,
                [name]:value
            }
        })
    };

    const senddata = async(e)=>{
        e.preventDefault();
        const {fname,email,mobile,password,cpassword} = udata;

        if(fname === ""){
            toast.warn("enter name",{
                position: "top-center"
               })
        }
        else if(email === ""){
            toast.warn("enter mail",{
                position: "top-center"
               })
        }else{

        }

        const res = await fetch("register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,email,mobile,password,cpassword
            })
        });

        const data = await res.json();
        //console.log(data);

        if(res.status === 422 || !data){
           // alert("no data")
           toast.warn("invalid",{
            position: "top-center"
           })
        }
        else{
            //alert("success")
            toast.success("data succesfull added",{
                position: "top-center",
            })
        }
    }

    return (
        <>
            <section>
                <div className="sign_container">
                    <div className="sign_header">
                        <img src="https://res.cloudinary.com/djku5ilwq/image/upload/v1668551569/S5%20Project/Pngtree_e_commerce_logo_template_5066821_4_xjope8.png" alt="" />
                    </div>
                    <div className="sign_form">
                        <form method='POST'>
                            <h1>Create Account</h1>
                            <div className="form_data">
                                <label htmlFor="fname">Your Name</label>
                                <input type="text" onChange={adddata} value={udata.fname} name="fname"id="fname" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={adddata} value={udata.email} name="email" id="email" />
                            </div>
                            <div className="form_data">
                            <label htmlFor="number">Phone Number</label>
                            <input type="number" onChange={adddata} value={udata.mobile} name="mobile"
                               
                                id="mobile" />
                        </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={adddata} value={udata.password} name="password"

                                    id="password" placeholder="At least 6 characters" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="cpassword">Retype Password</label>
                                <input type="password" onChange={adddata} value={udata.cpassword} name="cpassword"

                                    id="cpassword" placeholder="" />
                            </div>
                            <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                            <div className='signin_info'>
                                <p>Already Have An Account</p>
                                <NavLink to="/login">Sign In</NavLink>
                            </div>
                        </form>
                    </div>
                    <ToastContainer/>
                </div>

            </section>
        </>
    )
}

export default SignUp