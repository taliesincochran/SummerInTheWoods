import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
 

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
	 super(props);

	 this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
	 event.preventDefault();
	 const {
		email,
		password,
	 } = this.state;
	 let accountObject = {};
	 auth.doSignInWithEmailAndPassword(email, password).then((obj) => this.props.history.push("/admin-application-view"))
		//    console.log('signIn object', obj);
		// 	db.getApplications().then(snapshot=> {
		// 		let applications = []
		// 		let userApplications = snapshot.val();
		// 		return userApplications;
		// 	}).then(userApplicationInfo => {
				// history.push(path="/")
		// 	})
		// 		})
		// 	.catch(error=>{
		// 			console.log(error);
		// 			this.setState(updateByPropertyName('error', error));
			// });
    }

  render() {
	 const {
		email,
		password,
		error,
	 } = this.state;

	 const isInvalid =
		password === '' ||
		email === '';
	 console.log("These are the props at the signin page: ", this.props);  
	 return (

		<form onSubmit={this.onSubmit}>
		  <input
			 value={email}
			 onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
			 type="text"
			 placeholder="Email Address"
		  />
		  <input
			 value={password}
			 onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
			 type="password"
			 placeholder="Password"
		  />
		  <button disabled={isInvalid} type="submit">
			 Sign In
		  </button>

		  { error && <p>{error.message}</p> }
		</form>
	 );
  }
}

export default withRouter(SignInForm);
