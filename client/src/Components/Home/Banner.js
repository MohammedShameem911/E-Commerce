import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "../Home/banner.css";

const data = [
    " https://res.cloudinary.com/djku5ilwq/image/upload/v1667997440/S5%20Project/1_qejzji.png",
    "https://res.cloudinary.com/djku5ilwq/image/upload/v1667997868/S5%20Project/2_k8di3b.jpg",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
]

console.log(data);

const Banner = () => {
    return (
        <>

            <Carousel
                className="carasousel"
                autoPlay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "#fff",
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "104px",
                    }
                }}>
                {
                    data.map((imag, i) => {
                        return (
                            <>
                                <img src={imag} alt="img" key={i} className="banner_img" />
                            </>
                        )
                    })
                }

            </Carousel>
        </>
    )
}

export default Banner;