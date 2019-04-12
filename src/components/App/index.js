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
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Menu from '../../components/Menu';
import getFirebase, { withFirebase, FirebaseContext } from '../../components/Firebase';

const AppRouter = props => {
  return(
    props.withFirebase?(
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
        <AdminPage exact path='admin' {...props} >
          <ViewApplications path='/admin/viewApplicaitons' {...props} />
        </AdminPage>
        <HomePage exact path='/' {...props} />
        <NotFoundPage default />
      </Router>
    ):
    (
      <Router>
        <Contact path='contact' {...props} />
        <ThankYou path='thankyou' {...props} />
        <Prices path='prices' {...props} />
        <PasswordForgetPage path='pw-forget' {...props} />
        <SignInPage path='signin' {...props} />
        <ContactRecieved path='contactRecieved' {...props} />
        <Paypal path='paypal/:query' {...props} />
        <Failure path='failure' {...props} />
        <HomePage exact path='/' {...props} />
        <NotFoundPage default />
      </Router>
    )
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loadCount = 0;
    this.firebase = null;
    this.state = {
      auth: null
    };
  }
  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: ''});
    }, 500);
  
  }
  render() {
    return(
      <React.Fragment>
        {
          !(this.props.firebase || !this.props.firebase.state || !this.props.firebase.state.data || !this.props.firebase.state.data.campTimes || !(this.props.firebase.state.data.campTimes.length > 0))?
            <AppRouter withFirebase={false} {...this.props} />
          :
            <AppRouter withFirebase={true} rawCampTimes={this.props.firebase.state.data.rawCampTimes} weekArray={this.props.firebase.state.data.weekArray} campTimes={this.props.firebase.state.data.campTimes} views={this.props.firebase.state.data.views} views2={this.props.firebase.state.data.views2} {...this.props} />
        }
      </React.Fragment >
    )
  }
}
export default withFirebase(App);
