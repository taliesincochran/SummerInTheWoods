import React from 'react';
import Helmet from 'react-helmet';
import Banner from '../components/Banner'

const Account = (props) => {
    return(
        <div>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="Account Page" />
            </Helmet>
            <Banner bannerClass="contactBanner" />
            <div id="main">
                <div className="inner">
                </div>
            </div>
        </div>
    )
}
export default Account;