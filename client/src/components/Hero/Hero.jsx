import React from 'react'
import "./Hero.css"
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import SearchBar from '../SearchBar/SearchBar'
const Hero = () => {

    return (
        <section className='hero-wrapper'>
            <div className='paddings innerWidth hero-container'>
                <div className="flexColStart grid-two-cols hero-left">
                    <div className="hero-title">
                        <div className="orange-circle" />


                        <motion.h1
                            initial={{ y: "2rem", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 2,
                                type: "spring"
                            }

                            }

                        >Discover<br />The Best Home<br /> For Yourself</motion.h1>
                    </div>
                    <div className=" secondaryText flexColStart hero-desc">
                        <span>
                            Some description here lkjkhjghnmngfgdfsdd
                        </span>
                        <span>
                            Some description here hhakhdjndmfns
                        </span>
                    </div>
                    <SearchBar />
                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={8800} end={9000} duration={4} />
                                <span>+</span>
                            </span>

                            <span className='secondaryText'>
                                Premium Products
                            </span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={1259} end={2000} duration={4} />
                                <span>+</span>
                            </span>

                            <span className='secondaryText'>
                                Happy Customers
                            </span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={28} />
                                <span>+</span>
                            </span>

                            <span className='secondaryText'>
                                Award Winnings
                            </span>
                        </div>
                    </div>
                </div>


                <div className="flexEnd hero-right">
                    <motion.div
                        initial={{ x: "3rem", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 2,
                            type: "spring"
                        }}

                        className="image-container">
                        <img src="./hero-image.png" alt="hero-image" />
                    </motion.div>
                </div>
            </div>
        </section >

    )
}

export default Hero
