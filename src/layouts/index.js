import * as React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby-link';
import '../assets/scss/main.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import App from '../components/App';
import Navigation from '../components/Navigation';
import getFirebase, { FirebaseProvider } from '../components/Firebase';
// import withAuthentication from '../components/Session/withAuthentication';
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
      firebase: null,
      views: [],
      views2:[]
    };
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }
  componentDidMount() {
    this.firebaseInit();
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '' });
    }, 500);
  }
  componentDidUpdate() {
    this.firebaseInit();
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

  getCalendar = (rawCampTimes) => {
    let length = 0;
    if(rawCampTimes) {
      let keys = Object.keys(rawCampTimes);
      length = keys.length;
    }
    if(length > 0) {
      // get current date, month, year
      let dateObject = new Date();
      let date = dateObject.getDate();
      let month = dateObject.getMonth();
      let year = dateObject.getFullYear();
      // get the timezone of the applicant for security purposes
      let localTimezoneOffset = dateObject.getTimezoneOffset()
      // data from firebase to be processed into the year or years to be displayed
      let rawYearsArray = Object.keys(rawCampTimes['year']);
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
      let campTimes = yearsArray.map(thisYear => {
        let campTime = rawCampTimes['year'][thisYear];
        return campTime;
      });
      const views = this.getViews(parseInt(chosenYear));
      const views2 = this.getViews((parseInt(chosenYear) + 1));
      const weekArray = this.getWeeks(rawCampTimes['year'][chosenYear], parseInt(chosenYear));
      this.setState({
        campTimes,
        rawCampTimes,
        date,
        month,
        year,
        localTimezoneOffset,
        yearsArray,
        chosenYear,
        views,
        views2,
        weekArray
      });
    }
  }
  handleToggleMenu() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }
  getWeeks(yearChosen, yearString) {
    let weekArray = [];
    let year = yearString;
    for (let weekChosen in yearChosen) {
      let week = weekChosen;
      let { start, end, available, pending, noCamp } = yearChosen[week]
      start = new Date(start);
      start = start.getMonth() + "/" + start.getDate();
      end = new Date(end);
      end = end.getMonth() + "/" + end.getDate();
      weekArray.push({ week, year, start, end, available, pending, noCamp })
    }
    return weekArray
  }
  getViews = (year) => {
    let months = ["June", "July", "August"];
    let dates = months.map((month, i) => {
      let monthInt = i + 5;
      return new Date(year, monthInt, 1);
    });
    let views = [];
    for (var i = 0; i < months.length; i++) {
      let month = months[i];
      let date = dates[i];
      views.push({ month, date, i })
    }
    return views;
  }
  // handleChange(event) {
  //   let { name, value } = event.target;
  //   this.setState({ [name]: value });
  // }
  render() {
    let {
      firebase,
      loading,
      isMenuVisible,
      auth
    } = this.state;
    return (
      <FirebaseProvider>
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
            <App onToggleMenu={this.handleToggleMenu} {...this.state} />
            {/* <hr /> */}
            <Footer
              pathname={this.props.pathname}
              auth={auth}
              state={this.state}
              handleChange={this.handleChange}
              firebase={firebase}
            />
          </div>
          {(this.props.firebase && this.props.firebase.state && this.props.firebase.state.data) ?
            <React.Fragment>
              <Footer
                pathname={this.props.pathname}
                auth={this.state.auth}
                state={this.state}
                handleChange={this.handleChange}
                firebase={this.props.firebase.state.data}
              />
              <Menu onToggleMenu={this.handleToggleMenu}>
                <Navigation
                  firebase={this.props.firebase.state.data}
                  pathname={this.props.pathname}
                  handleChange={this.handleChange}
                  button={false}
                  onToggleMenu={this.handleToggleMenu}
                  auth={this.state.auth}
                  {...this.props} />
              </Menu>
            </React.Fragment>
            :
            <React.Fragment>
              <Footer
                pathname={this.props.pathname}
                auth={this.state.auth}
                state={this.state}
                handleChange={this.handleChange}
                firebase={{}}
              />
              <Menu onToggleMenu={this.handleToggleMenu}>
                <Navigation
                  firebase={{}}
                  pathname={this.props.pathname}
                  handleChange={this.handleChange}
                  button={false}
                  onToggleMenu={this.handleToggleMenu}
                  auth={this.state.auth}
                  {...this.state} />
              </Menu>
            </React.Fragment>
          }}
        </div>
      </FirebaseProvider>
    );
  }
}



export default Layout;
