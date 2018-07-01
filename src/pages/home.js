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
        console.log('index pages state', this.state)
        const siteTitle = "Summer In The Woods"
        const siteDescription = "A Montessori Inspired Summer Camp in Carrbor, NC"
        console.log("index pages props", this.props)
        console.log('history pushed state: ', this.props.location.state?this.props.location.state:null)
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
                                <h2>Our Program</h2>
                            </header>
                            <p>We draw inspiration from Montessori and Reggio Emilia philosophies and our program is based outdoors with an emphasis on unstructured, child-led play. Mostly, we want to offer a camp that captures the magic that we remember from our own childhood summers- a camp where children are simply free to play.</p>
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
                                        <h3>Our Philosophy</h3>
                                    </header>
                                    <p>
                                        We welcome children, ages 3-7 (with some flexibility). Camp runs weekly, June 18 - August 10 from 9 am to 1 pm (no camp July 2-6) with choice of 5 or 3 days per week. Receive a discount when you sign up for four or more weeks! Our camp is located near McDougle school in Chapel Hill, in an area surrounded by nature. For more information, contact <a className="email" href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a>
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
                            <div className="image">
                                <img src={pic10} alt="" />
                            </div>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>The Location</h3>
                                    </header>
                                    <p>We welcome children, ages 3-7 (with some flexibility). Camp runs weekly, June 18 - August 10 from 9 am to 1 pm (no camp July 2-6) with choice of 5 or 3 days per week. Receive a discount when you sign up for four or more weeks! Our camp is located near McDougle school in Chapel Hill, in an area surrounded by nature. For more information, contact <a className="email" href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a></p>
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