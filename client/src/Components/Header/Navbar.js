import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {

  const { account, setAccount } = useContext(LoginContext);
  //console.log(account);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState (null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dropen, setDropen] = useState(false)

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json"
      },
      credentials: "include"
    });

    const data = await res.json();
    //console.log(data);

    if (res.status !== 201) {
      console.log("error");
    }
    else {
      console.log("data valid");
      setAccount(data);
    }
  };

  const handleopen = () => {
    setDropen(true)
  };

  const handleclose = () => {
    setDropen(false)
  }

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json"
      },
      credentials: "include"
    });

    const data = await res2.json();
    console.log(data);

    if (res2.status !== 201) {
      console.log("error");
    }
    else {
      console.log("data valid");
      toast.success("Logout Succesfully",{
        position: "top-center"
       })
      history("/");
      setAccount(false);
    }
  };

  useEffect(() => {
    getdetailvaliduser()
  }, [])


  return (
    <header>
      <nav>
        <div className="left">

          <IconButton className='hamburgur' onClick={handleopen}

          >
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handleclose}>
            <Rightheader Logclose={handleclose} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="https://res.cloudinary.com/djku5ilwq/image/upload/v1668551569/S5%20Project/Pngtree_e_commerce_logo_template_5066821_4_xjope8.png" alt="" />
            </NavLink>
          </div>
          <div className='nav_searchbaar'>
            <input type="text" name="search" value="" />
            <div className='search_icon'>
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className='nav_btn'>
            <NavLink to="/login">Sign In</NavLink>
          </div>
          <div className='cart_btn'>

            {
              account ?
                <NavLink to="/buynow">
                  <Badge badgeContent={account.carts.length} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink> : <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
            }

            <ToastContainer/>

            <p>Cart</p>
          </div>
          {
            account ?
              <Avatar className='avtar2'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> :
              <Avatar className='avtar'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}></Avatar>
          }


          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >        
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ?   <MenuItem onClick={handleClose} onClick={logoutuser}><LogoutIcon style={{fontSize:16,marginRight:3,color:"red"}}/>Logout</MenuItem>:""

            }
          </Menu>
        </div>
      </nav>
    </header>
  )
}

export default Navbar