import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'

const Mail = (props) => {
	const _props = props.location.state
    const gotchaStyle = {
        display: 'none'
    }
    const message = _props.parent1Name + "has filled out an application for your camp. Please email them at " + _props.email + " the address so that they can mail thier check for the $" + _props.amountDue + " to confirm the hold.";
    return(
        <div>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="Mail Page" />
            </Helmet>
            <BannerLanding bannerClass="contactBanner" />
            <div id="main">
                <div className="inner">
                    <section>
                    	<p>Please fill out this form and we will email you the address to send the check for the ${_props.amountDue}.00</p>
                        <form method="post" action="https://formspree.io/taliesincochran@gmail.com">
                            <div className="field half first">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" />
                            </div>
                            <div className="field half">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="_replyto" id="email" />
                            </div>
                            <div className="gotcha" style={gotchaStyle}>
                                <input type="text" name="_gotcha" style={gotchaStyle} className="gotcha" />
                                <input type="hidden" name="_next" value="/" />
                            </div>
                            <div className="field" style={{display:"none"}}>
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" rows="6">{message}</textarea>
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
                                <a href="tel:0000000000">(000) 000-0000</a>
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

export default Mail