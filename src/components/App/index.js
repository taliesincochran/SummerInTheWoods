import React from 'react';
import { Router, Redirect } from '@reach/router';
import ReactDOM from 'react-dom';
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
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: ''});
    }, 500);
  
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.firebase === undefined) {
      return true;
    } else {
      return false;
    }

  }
  render() {
    return(
      <Router>
        <Calendar path='calendar' {...this.props} />
        <Contact path='contact' {...this.props} />
        <ThankYou path='thankyou' {...this.props} />
        <Prices path='prices' {...this.props} />
        <PasswordForgetPage path='pw-forget' {...this.props} />
        <SignInPage path='signin' {...this.props} />
        <ContactRecieved path='contactRecieved' {...this.props} />
        <Apply path='apply' {...this.props} />
        <Paypal path='paypal/:query' {...this.props} />
        <Failure path='failure' {...this.props} />
        <AdminPage exact path='admin' {...this.props} >
          <ViewApplications path='/admin/viewApplicaitons' {...this.props} />
        </AdminPage>
        <HomePage exact path='/' {...this.props} />
        <NotFoundPage default />
      </Router>
    );
  }
}
export default withFirebase(App);
