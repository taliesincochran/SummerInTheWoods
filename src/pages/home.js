import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Banner from '../components/Banner/';
import BannerLanding from '../components/BannerLanding/';
import { db } from '../firebase'
import pic08 from '../assets/images/pic08.jpg';
import pic09 from '../assets/images/pic09.jpg';
import pic10 from '../assets/images/pic10.jpg';
import pic12 from '../assets/images/pic12.jpg';
import { philosophy, location, information, program } from '../constants/homeVariables';


class HomeIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textObj: {}
        }
      }
    componentDidMount() {
        db.getText().then(snapshot=> {
            this.setState({textObj: snapshot.val()})
        })
    }
    render() {
        const siteTitle = "Summer In The Woods"
        const siteDescription = "A Montessori Inspired Summer Camp in Carrbor, NC"
        return (
            <div>
                <Helmet>
                    <title>{siteTitle}</title>
                    <meta name="description" content={siteDescription} />
                </Helmet>

                <BannerLanding 
                    bannerClass="indexBanner" 
                    />

                <div id="main">
                    <section id="one">
                        <div className="inner">
                            <header className="major">
                                <h2>Our Philosophy</h2>
                            </header>
                            <p>
                                {philosophy}
                            </p>
                        </div>
                    </section>
                    <section id="two" className="spotlights">
                        <section>
                            <div className="image">
                                <img src={pic08} alt="" />
                            </div>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>Our Program</h3>
                                    </header>
                                    <p>
                                        {program}
                                    </p>
                                    {/*<ul className="actions">
                                        <li><Link to="/generic" className="button">Learn more</Link></li>
                                    </ul>*/}
                                </div>
                            </div>
                        </section>
                        <section>
                            <div  className="image">
                                <img src={pic09} alt="" />
                            </div>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>Information</h3>
                                    </header>
                                    <p>
                                        {information}
                                    </p>
                                    {/*<ul className="actions">
                                        <li><Link to="/generic" className="button">Learn more</Link></li>
                                    </ul>*/}
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="image">
                                <img src={pic10} alt="" />
                            </div>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>The Location</h3>
                                    </header>
                                    <p>
                                        {location}
                                    </p>
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

// export const pageQuery = graphql`
//     query PageQuery {
//         site {
//             siteMetadata {
//                 title
//                 description
//             }
//         }
//     }
// `