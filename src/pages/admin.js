import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'

const Admin = (props) => {
    return(
    !this.props.location.state?<Redirect to="/"/>:
        <div>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="Admin Page" />
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

export default Admin
