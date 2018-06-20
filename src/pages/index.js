import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Banner from '../components/Banner';
import BannerLanding from '../components/BannerLanding';

import pic08 from '../assets/images/pic08.jpg';
import pic09 from '../assets/images/pic09.jpg';
import pic10 from '../assets/images/pic10.jpg';
import pic12 from '../assets/images/pic12.jpg';


class HomeIndex extends React.Component {
    render() {
        const siteTitle = "Summer In The Woods"
        const siteDescription = "A Montessori Inspired Summer Camp in Carrbor, NC"
        console.log("index props", this.props)
        return (
            <div>
                <Helmet>
                    <title>{siteTitle}</title>
                    <meta name="description" content={siteDescription} />
                </Helmet>

                <BannerLanding bannerClass="indexBanner" />

                <div id="main">
                    <section id="one">
                        <div className="inner">
                            <header className="major">
                                <h2>Our Philosophy</h2>
                            </header>
                            <p>We draw inspiration from Montessori and Reggio Emilia philosophies 
                            <br/>and our program is based outdoors with an emphasis on unstructured, 
                            <br/>child-led play. </p>
                        </div>
                    </section>
                    <section id="two" className="spotlights">
                        <section>
                            <Link to="/generic" className="image">
                                <img src={pic08} alt="" />
                            </Link>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>The Childs Day</h3>
                                    </header>
                                    <p>
                                        Our mornings at camp will vary depending on the interests of the children. 
                                    </p>
                                    {/*<ul className="actions">
                                        <li><Link to="/generic" className="button">Learn more</Link></li>
                                    </ul>*/}
                                </div>
                            </div>
                        </section>
                        <section>
                            <Link to="/generic" className="image">
                                <img src={pic09} alt="" />
                            </Link>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>Play</h3>
                                    </header>
                                    <p>Play will often involve creating artwork with lots of different
                                        <br/>materials (clay, sculpture, painting, collage, etc.), exploring the 
                                        <br/>natural environment, building, reading, resting, caring for our animals, 
                                        <br/>and working both independently and collaboratively. </p>
                                    {/*<ul className="actions">
                                        <li><Link to="/generic" className="button">Learn more</Link></li>
                                    </ul>*/}
                                </div>
                            </div>
                        </section>
                        <section>
                            <Link to="/generic" className="image">
                                <img src={pic10} alt="" />
                            </Link>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>The Location</h3>
                                    </header>
                                    <p>Located in Carrboro, NC near McDougal Elementary on 1.4 acres.</p>
                                    {/*<ul className="actions">
                                        <li><Link to="/generic" className="button">Learn more</Link></li>
                                    </ul>*/}
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        )
    }
}

export default HomeIndex

export const pageQuery = graphql`
    query PageQuery {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`