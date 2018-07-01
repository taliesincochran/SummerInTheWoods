import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }
    handleToggleMenu() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      console.log("withAuth props", this.props)
      const { authUser } = this.state;
      this.state.authUser?console.log((this.state.authUser)):''

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component { ...this.props } />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;