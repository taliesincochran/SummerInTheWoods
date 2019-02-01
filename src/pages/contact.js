import * as React from "react";
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/';
import Layout from '../components/layout'

const Contact = (props) => {
    return(
        <Layout>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="Contact Page" />
            </Helmet>
            <BannerLanding bannerClass="contactBanner" />
            <div id="main">
                <div className="inner">
                    <section>
                        <form method="post" action={process.env.GATSBY_EMAIL_CONTACT_TO}>
                            <div className="name hide">
                                <input type="hidden" name="_redirect" value="/" />
                            </div>
                            <div className="field">
                                <input type="text" name="spam" className="hide" />
                            </div>
                            <div className="field">
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" id="email"></input>
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
                                <a className="email" href={process.env.GATSBY_CAMP_EMAIL}>{process.env.GATSBY_CAMP_EMAIL}</a>
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
        </Layout>
    )
}

export default Contact;
