import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <section className="f-wrapper">
            <div className="paddings innerWidth flexCenter f-container">
                <div className="flexColStart f-left">
                    <img src="bird-logo.png" alt="" width={120} />
                    <span className='secondaryText'>
                        Our vision, your dream place and....
                    </span>
                </div>
                <div className="flexColStart f-right">
                    <span className='primaryText'>
                        Information</span>
                    <span className='secondaryText'>
                        Islamabad, Capital Territory Pakistan
                    </span>
                    <div className="flexCenter f-menu">
                        <span>Property</span>
                        <span>Services</span>
                        <span>Product</span>
                        <span>About Us</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
