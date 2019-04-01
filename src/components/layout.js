import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby-link';
import '../assets/scss/main.scss';
import Header from '../components/Header/';
import Footer from '../components/Footer/';
import Menu from '../components/Menu/';
import Navigation from './Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';
import Helper from '../constants/helper';
import * as db from '../constants/db';



class Layout extends Component {
  constructor(props) {
    super(props);
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
    this.helper = new Helper(this.state, this.props);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const date = new Date;
    const year = parseInt(date.getFullYear());
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');
    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);
      this.setState({ firebase });
    }, () => {this.helper.getCalendar(db.getValue(this.state.database, `/campTimes/year/`), this.setState);});
  }
  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
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
        <div className={`body ${loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
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
            <AppWithAuthentication {...this.props} />
            <hr />
            <Footer
              pathname={this.props.pathname}
              auth={auth}
              state={this.state}
              handleChange={this.handleChange}
            />
          </div>
          <Menu onToggleMenu={this.handleToggleMenu}>
            <Navigation
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

const AppWithAuthentication = withAuthentication(({ children }) => (
  <Fragment>
    <Navigation />
    <hr />
    {children}
  </Fragment>
));

export default Layout;
