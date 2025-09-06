import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion'
import "react-accessible-accordion/dist/fancy-example.css"
import "./Value.css"
import { MdOutlineArrowDropDown } from 'react-icons/md'
import data from '../../utils/accordion'

const Value = () => {

    const [className, setClassName] = useState(null);
    return (
        <section className="v-wraaper">
            <div className="paddings innerWidth flexCenter v-container">
                <div className="v-left">
                    <div className="image-container">
                        <img src="./value.png" alt="value" />
                    </div>
                </div>

                <div className="flexColStart v-right">
                    <span className='orangeText'>OurValue</span>
                    <span className='primaryText'>Value We Give To You</span>
                    <span className="secondaryText">
                        Lorem ipsum
                    </span>
                    <Accordion
                        className='accordion'
                        allowMultipleExpanded={false}
                        preExpanded={[0]}
                    >

                        {
                            data.map((item, i) => (
                                <AccordionItem uuid={i} key={i}>
                                    <AccordionItemState>
                                        {({ expanded }) => (
                                            <div className={`accordionItem ${expanded ? "expanded" : "collapsed"}`}>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton className='flexCenter accordionButton'>
                                                        <div className="flexCenter icon">
                                                            {item.icon}
                                                        </div>
                                                        <span className='primaryText'>{item.heading}</span>
                                                        <div className='flexCenter icon'>
                                                            <MdOutlineArrowDropDown size={20} />
                                                        </div>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p className="secondaryText">{item.detail}</p>
                                                </AccordionItemPanel>
                                            </div>
                                        )}
                                    </AccordionItemState>
                                </AccordionItem>
                            ))
                        }

                    </Accordion>

                </div>
            </div>
        </section>
    )
}

export default Value
