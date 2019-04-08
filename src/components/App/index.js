import React from 'react';
import { Router, Redirect } from '@reach/router';
// import Navigation from '../Navigation';
// import SignUpPage from '../../pages/signUp';
import SignInPage from '../../pages/signIn';
import PasswordForgetPage from '../../pages/pw-forget';
import HomePage from '../../pages/index';
// import AccountPage from '../../pages/account';
import AdminPage from '../../pages/admin';
import Calendar from '../../pages/calendar';
import Apply from '../../pages/apply';
import Contact from '../../pages/contact';
import Failure from '../../pages/failure';
import Prices from '../../pages/prices';
import ContactRecieved from '../../pages/contactReceived';
import ThankYou from '../../pages/thankyou';
import Paypal from '../../pages/paypal';
import NotFoundPage from '../../pages/404';
import ViewApplications from '../../pages/viewApplications';
import getFirebase, { withFirebase, FirebaseContext } from '../../components/Firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loadCount = 0;
    this.firebase = null
  }
  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '', });
    }, 100);
    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);
      firebase.getCalendar().then(data => {
        const { 
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
        } = data;
        this.setState({
          firebase,
          // campTimes,
          // rawCampTimes,
          // date,
          // month,
          // year,
          // localTimezoneOffset,
          // yearsArray,
          // chosenYear,
          // views,
          // views2,
          // weekArray
          }, () => { console.log('app state mount', this.state) });
      });
    });
  }
  render() {
    return(
      <Router>
        <Calendar path='calendar' {...this.state} />
        <Contact path='contact' {...this.state} />
        <ThankYou path='thankyou' {...this.state} />
        <Prices path='prices' {...this.state} />
        <PasswordForgetPage path='pw-forget' {...this.state} />
        <SignInPage path='signin' {...this.state} />
        <ContactRecieved path='contactRecieved' {...this.state} />
        <Apply path='apply' {...this.state} />
        <Paypal path='paypal/:query' {...this.state} />
        <Failure path='failure' {...this.state} />
        <AdminPage exact path='admin' {...this.state} >
          <ViewApplications path='/admin/viewApplicaitons' {...this.state} />
        </AdminPage>
        <HomePage exact path='/' {...this.state} />
        <NotFoundPage default />
      </Router>
    );
  }
}
export default withFirebase(App);
