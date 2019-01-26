import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import { Redirect } from "react-router-dom"
import { emailContactTo } from '../constants/variables';

const Contact = (props) => {
    return(
    !props.location.state?<Redirect to="/"/>:
        <div>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="Contact Page" />
            </Helmet>
            <BannerLanding bannerClass="contactBanner" />
            <div id="main">
                <div className="inner">
                    <section>
                        <form method="post" method={emailContactTo}>
                            <div className="name" class="hide">
                                <input type="hidden" name="_redirect" value="/" />
                            </div>
                            <div className="field">
                                <input type="text" name="spam" className="hide" />
                            </div>
                            <div className="field">
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" id="email"></email>
                            </div>
                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <textarea name="name" id="name" rows="6"></textarea>
                            </div>
                            <div className="field">
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" rows="6"></textarea>
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
                            {/*The long string of ASCII is to confuse scraping bots*/}
                                <a className="email" href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a>
                            </div>
                        </section>
                        <section>
                            <div className="contact-method">
                                <span className="icon alt fa-home"></span>
                                <h3>Location</h3>
                                <span>
                                    Located on 1.4 acres off of Hillsboro Road, near McDougal Elementary in Carrboro, North Carolina
                                </span>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Contact
