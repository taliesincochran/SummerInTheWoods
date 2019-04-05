import * as React from "react";
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/';
class Failure extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Failed Payment Page" />
                </Helmet>
                <BannerLanding bannerClass="contactBanner" />
                <div>
                    <div id="main">
                        <div className="inner">
                            <h2>Your paypal payment failed.  Please contact us through the contact form and arrange another way to pay.</h2>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Failure;