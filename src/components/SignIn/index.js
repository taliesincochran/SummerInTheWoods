import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { db } from '../../firebase';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
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

    const {
      history,
    } = this.props;
    let accountObject = {};
    let userApplications = [];
    auth.doSignInWithEmailAndPassword(email, password)
      .then((obj) => {
        console.log('signIn object', obj);
        db.getOneUser(obj.user.uid)
            .then(object=>{
                console.log("This is what comes back from the server: ", object.val());
                accountObject= object.val();
                db.getApplications().then(snapshot=> {
                  let data = snapshot.val();
                  console.log("data", data)
                  for (let application in data) {
                    console.log(data[application], data[application].parent1Email == accountObject.email)
                    if(data[application].parent1Email == accountObject.email) {
                      userApplications.push(data[application]);
                      console.log("application found", data[application])
                    }
                  }
                })
            })
            .catch(error=>{
                console.log(error);
            });
        //this.setState({user: "Hello"});
        console.log("This is the login state: ", this.state)
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

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
