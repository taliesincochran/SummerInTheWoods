import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import { Redirect } from "react-router-dom"

const Success = (props) => {
    const gotchaStyle = {
        display: 'none'
    }
    return(
        <div>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="Success" />
            </Helmet>
            <BannerLanding bannerClass="contactBanner" />
            <div id="main">
                <div className="inner">
                    <section>
                        <p>Your paypal payment has been processed.  Your childs spot has been reserved.  If you have any questions, please use the form below or email <a className="email" href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a></p>
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
                </div>
            </div>
        </div>
    )
}

export default Success