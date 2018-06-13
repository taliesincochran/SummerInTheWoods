import React from 'react'
import Helmet from 'react-helmet'

const Contact = (props) => (
    <div>
        <Helmet>
            <title>Summer In The Woods</title>
            <meta name="description" content="Contact Page" />
        </Helmet>
        <div id="main">
            <div className="inner">
                <section>
                    <form method="post" action="https://formspree.io/taliesincochran@gmail.com">
                        <div className="field half first">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="field half">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="_replyto" id="email" />
                        </div>
                        <div className="gotcha">
                            <input type="text" name="_gotcha" className="gotcha" />
                        </div>
                        <div className="field">
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" rows="6"></textarea>
                        </div>
                        <ul className="actions">
                            <li><input type="submit" value="Send Message" className="special" /></li>
                            <li><input type="reset" value="Clear" /></li>
                        </ul>
                    </form>
                </section>
                <section className="split">
                    <section>
                        <div className="contact-method">
                            <span className="icon alt fa-envelope"></span>
                            <h3>Email</h3>
                            <a href="mailto:summerinthewoodscamp@gmail.com">summerinthewoodscamp@gmail.com</a>
                        </div>
                    </section>
                    <section>
                        <div className="contact-method">
                            <span className="icon alt fa-phone"></span>
                            <h3>Phone</h3>
                            <a href="tel:0000000000">(000) 000-0000</a>
                        </div>
                    </section>
                    <section>
                        <div className="contact-method">
                            <span className="icon alt fa-home"></span>
                            <h3>Location</h3>
                            <span>Located on 1.4 acres<br />
                                Off of Hillsboro Rd. <br />
                                Near McDougal Elementary<br />
                                In Carrboro, North Carolina<br />
                            </span>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
)

export default Contact
