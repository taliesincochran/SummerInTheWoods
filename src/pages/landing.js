import * as React from "react";
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding';
import Layout from '../components/layout';

const Landing = (props) => (
    <Layout>
        <Helmet>
            <title></title>
            <meta name="description" content="Landing Page" />
        </Helmet>

        <BannerLanding />

        <div id="main">
        </div>

    </Layout>
)

export default Landing