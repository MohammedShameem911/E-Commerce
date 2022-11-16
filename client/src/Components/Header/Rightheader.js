import React, { useContext } from 'react'
import "./Rightheader.css";
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';


const Rightheader = ({Logclose}) => {

    const { account, setAccount } = useContext(LoginContext);

    return (
        <>
            <div className='rightheader'>
                <div className='right_nav'>
                    {
                    account ?
                    <Avatar className='avtar2' >{account.fname[0].toUpperCase()}</Avatar>:
                    <Avatar className='avtar' ></Avatar>
                    }
                    {
                        account ? <h3>{account.fname.toUpperCase()}</h3>:""
                    }
                </div>
                <div className='nav_btn' onClick={()=>Logclose}>
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/">Shop By Category</NavLink>
                    <Divider style={{width:"100%",marginLeft:"-20px"}}/>
                    <NavLink to="/">Today's Deal</NavLink>
                    <Divider style={{width:"100%",marginLeft:"-20px"}}/>

                    {
                        account ?
                            <NavLink to="/buynow">Your Orders</NavLink> : <NavLink to="/login">Your Orders</NavLink>
                    }

                    <Divider style={{width:"100%",marginLeft:"-20px"}}/>
                    <div className='flag'>
                        <NavLink to="/">Setting</NavLink>
                        <img src='' alt=''/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rightheader