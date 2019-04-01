import React from 'react'
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/';
import Link from 'gatsby-link';
import Layout from "../components/layout";

const NotFoundPage = () => (
  <div>
    <Helmet>
      <title>Summer In The Woods</title>
      <meta name="description" content="404 Page" />
    </Helmet>
    <BannerLanding bannerClass="contactBanner" />
      <div>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist.</p>
        <Link to="/">Home</Link>
      </div>
    </div>
)

export default () => (
  <Layout>
    <NotFoundPage />
  </Layout>
);
