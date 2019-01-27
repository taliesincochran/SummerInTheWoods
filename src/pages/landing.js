import * as React from "react";
import Helmet from 'react-helmet'
import BannerLanding from '../components/BannerLanding'

const Landing = (props) => (
    <div>
        <Helmet>
            <title></title>
            <meta name="description" content="Landing Page" />
        </Helmet>

        <BannerLanding />

        <div id="main">
        </div>

    </div>
)

export default Landing