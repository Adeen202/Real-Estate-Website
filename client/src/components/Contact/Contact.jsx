import React from 'react'
import './Contact.css'
import { MdCall } from 'react-icons/md'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { HiChatBubbleBottomCenter } from 'react-icons/hi2'
function Contact() {
    return (
        <section className="c-wrapper">
            <div className="paddings innerWidth flexCenter c-container">

                <div className="flexColStart r-left">
                    <span className='orangeText'>Our Contacts</span>
                    <span className='primaryText'>Easy To Contact Us</span>
                    <span className='secondaryText'>Extra Info Here</span>
                    <div className="flexColStart contactModes">
                        <div className="flexStart row">
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <MdCall size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>
                                            Call</span>
                                        <span className='secondaryText'>
                                            021 123 456 78
                                        </span>
                                    </div>
                                </div>
                                <div className="flexCenter button">
                                    Call Now
                                </div>
                            </div>

                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <BsFillChatDotsFill size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>
                                            Chat</span>
                                        <span className='secondaryText'>
                                            021 123 456 78
                                        </span>
                                    </div>
                                </div>
                                <div className="flexCenter button">
                                    Chat Now
                                </div>
                            </div>
                        </div>

                        <div className="flexStart row">
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <BsFillChatDotsFill size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>
                                            Video Call</span>
                                        <span className='secondaryText'>
                                            021 123 456 78
                                        </span>
                                    </div>
                                </div>
                                <div className="flexCenter button">
                                    Video Call Now
                                </div>
                            </div>

                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <HiChatBubbleBottomCenter size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>
                                            Message</span>
                                        <span className='secondaryText'>
                                            021 123 456 78
                                        </span>
                                    </div>
                                </div>
                                <div className="flexCenter button">
                                    Message Now
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="c-right">
                    <img src="./contact.jpg" alt="contact" className="image-container" />
                </div>
            </div>
        </section>
    )
}

export default Contact
