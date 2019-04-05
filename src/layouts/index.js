import * as React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby-link';
import '../assets/scss/main.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import App from '../components/App';
import Navigation from '../components/Navigation';
import getFirebase, { FirebaseContext } from '../components/Firebase';
import withAuthentication from '../components/Session/withAuthentication';
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this._count = 0;
    this._initFirebase = false;
    this.state = {
      isMenuVisible: false,
      loading: 'is-loading',
      auth: null,
      date: '',
      month: '',
      year: '',
      yearsArray: [],
      rawCampTimes: [],
      campTimes: [],
      localTimezoneOffset: 4,
      userAccount: '',
      firebase: null
    };
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate() {
    this.firebaseInit();
  }
  componentDidMount() {
    this._count += 1;
    this.firebaseInit();
    console.log('layout mounted', this._count)
    const date = new Date();
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '', });
    }, 100);
    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);
      this.setState({ firebase }, () => this.getCalendar(firebase));
    });
  }
  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.props.firebase.users().off();
  }
  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.props.firebase.users().on('value', snapshot => {
        this.setState({
          users: snapshot.val(),
        });
      });
      this.getCalendar(this.props.firebase);
    }
  };
  getCalendar = (firebase) => {
    if(firebase) {
      console.log('start get calendar')
      firebase.getValue('campTimes/year').then(rawCampTimes => {
        // get current date, month, year
        let dateObject = new Date();
        let date = dateObject.getDate();
        let month = dateObject.getMonth();
        let year = dateObject.getFullYear();
        // get the timezone of the applicant for security purposes
        let localTimezoneOffset = dateObject.getTimezoneOffset()
        // data from firebase to be processed into the year or years to be displayed
        let rawYearsArray = Object.keys(rawCampTimes);
        rawYearsArray.sort((a, b) => a - b);
        let yearIndex = 0;
        let chosenYear = year.toString();
        //if the date is already past the last week start date, don't display current year
        if (month > 7 && date > 8) {
          yearIndex = rawYearsArray.indexOf((year + 1).toString());
          chosenYear = (year + 1).toString();
        } else {
          yearIndex = rawYearsArray.indexOf(year.toString())
        }
        //Get rid of any data that is outdated
        let yearsArray = rawYearsArray.slice(yearIndex)
        //Make an array of relavent camptimes
        let campTimes = yearsArray.map(year => rawCampTimes[year])
        this.setState({
          campTimes,
          rawCampTimes,
          date,
          month,
          year,
          localTimezoneOffset,
          yearsArray,
          chosenYear
        }, ()=> {console.log('got calendar')});
      })

    } else {
      console.log('Get Calendar failed' , this.props, this.state)
    }
  }
  handleToggleMenu() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }
  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    const {
      firebase,
      loading,
      isMenuVisible,
      auth
    } = this.state;
    return (
      <FirebaseContext.Provider value={firebase}>
        <div className={`body ${loading} ${isMenuVisible ? 'is-menu-visible' : ''}`}>
          <Helmet
            title='Summer in the Woods Camp'
            meta={[
              { name: 'description', content: 'A forest school summer camp inspired by Montessori and Reggio Emilia philosophies in Carrboro, NC.  Located close to Chapel Hill, Hillsborough, and Durham in Orange County, North Carolina.' },
              { name: 'google-site-verification', content: 'zyT7Or4KfDcNlRsIhnybGosmb3rQWHLOTLYiVhtn8R0' },
              { name: 'siteUrl', content: "https://summerinthewoodscamp.com" },
            ]}
          >
            <link rel="stylesheet" href={withPrefix('skel.css')} />
          </Helmet>
          <div id="wrapper">
            <Header onToggleMenu={this.handleToggleMenu} />
            <App {...this.state} />
            <hr />
            <Footer
              pathname={this.props.pathname}
              auth={auth}
              state={this.state}
              handleChange={this.handleChange}
              firebase={firebase}
            />
          </div>
          <Menu onToggleMenu={this.handleToggleMenu}>
            <Navigation
              firebase={firebase}
              pathname={this.props.pathname}
              handleChange={this.handleChange}
              button={false}
              onToggleMenu={this.handleToggleMenu}
              auth={this.state.auth}
              state={this.state} />
          </Menu>
        </div>
      </FirebaseContext.Provider>
    );
  }
}



export default Layout;
