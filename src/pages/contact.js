import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding'

const Contact = (props) => (
    <div>
        <Helmet>
            <title>Summer In The Woods</title>
            <meta name="description" content="Contact Page" />
        </Helmet>
        <BannerLanding bannerClass="contactBanner" />
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
                        {/*The long string of ASCII is to confuse scraping bots*/}
                            <a className="email" href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a>
                        </div>
                    </section>
                    <section>
                        <div className="contact-method">
                            <span className="icon alt fa-phone"></span>
                            <h3>Phone</h3>
                            <a href="tel:&#40;&#50;&#49;&#48;&#41;&#55;&#52;&#52;&#45;&#50;&#52;&#57;&#57;">&#40;&#50;&#49;&#48;&#41;&#55;&#52;&#52;&#45;&#50;&#52;&#57;&#57;</a>
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

export default Contact
