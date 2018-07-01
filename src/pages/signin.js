import React from 'react';

import SignInForm from '../components/SignIn';
import { PasswordForgetLink } from '../components/PasswordForget';

const SignInPage = () =>
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
  </div>

export default SignInPage;