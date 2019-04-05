import React from 'react';
import { Router, Redirect } from '@reach/router';

import Navigation from '../Navigation';
import SignUpPage from '../../pages/signUp';
import SignInPage from '../../pages/signIn';
import PasswordForgetPage from '../../pages/pw-forget';
import HomePage from '../../pages/index';
import AccountPage from '../../pages/account';
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
import { withFirebase } from '../../components/Firebase';

const App = (props) => (
  <Router>
    <Calendar path='calendar' {...props} />
    <Contact path='contact' {...props} />
    <ThankYou path='thankyou' {...props} />
    <Prices path='prices' {...props} />
    <PasswordForgetPage path='pw-forget' {...props} />
    <SignInPage path='signin' {...props} />
    <ContactRecieved path='contactRecieved' {...props} />
    <Apply path='apply' {...props} />
    <Paypal path='paypal/:query' {...props} />
    <Failure path='failure' {...props} />
    <ViewApplications path='/viewApplicaitons' {...props} />
    <AdminPage exact path='admin' {...props} />
    <AdminPage path='admin' {...props} />
    <HomePage exact path='/' {...props} />
    <NotFoundPage default />
  </Router>
);

export default withFirebase(App);
