import React from 'react'
import "./Footer.css";


const Footer = () => {

    const year = new Date().getFullYear();
    console.log(year);

    return (
        <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3>Get to Know US</h3>
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>News</p>
                    
                </div>
                <div className="footr_details_one">
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                    <p>Linkedin</p>
                </div>
                
            </div>
            <div className="lastdetails">
                <img src="https://res.cloudinary.com/djku5ilwq/image/upload/v1668551569/S5%20Project/Pngtree_e_commerce_logo_template_5066821_4_xjope8.png" alt="logo"/>
                <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 2020-{year}, E-Commerce, Inc</p>
            </div>
        </footer>
    )
}

export default Footer