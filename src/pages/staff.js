import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'

const Staff = (props) => {
    return(
        <div>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="About Us" />
            </Helmet>
            <BannerLanding bannerClass="contactBanner" />
            <div id="main">
                <div className="inner">
                    To Do
                </div>
            </div>
        </div>
    )
}

export default Staff
