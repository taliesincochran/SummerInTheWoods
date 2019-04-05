import * as React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/';
import pic08 from '../assets/images/pic08.jpg';
import pic09 from '../assets/images/pic09.jpg';
import pic10 from '../assets/images/pic10.jpg';
import { philosophy, location, information, program } from '../constants/variables';
import { withFirebase } from '../components/Firebase';


class LandingPageBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }
  _initFirebase = false;

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
      console.log(this.props);
      this.props.firebase.users().on('value', snapshot => {
        this.setState({
          users: snapshot.val(),
        });
      });
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  render() {
    const siteTitle = "Summer In The Woods";
    const siteDescription = "A forest school summer camp inspired by Montessori and Reggio Emilia philosophies in Carrboro, NC.  Located close to Chapel Hill, Hillsborough, and Durham in Orange County, North Carolina."
    const siteURL = "https://www.summerinthewoodscamp.com";
    console.log(this.props, this.state)
    return (
      <React.Fragment>
        <Helmet>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
          <meta name="title" content={siteTitle} />
          <meta name="siteUrl" content={siteURL}/>
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
                </div>
              </div>
            </section>
            <section>
              <div className="image">
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
                </div>
              </div>
            </section>
          </section>
        </div>
      </React.Fragment>
    )
  }
}
const LandingPage  = withFirebase(LandingPageBase);
export const pageQuery = graphql`
    query PageQuery {
        site {
            siteMetadata {
                title
                description
                siteUrl
            }
        }
    }
`
export default LandingPage;