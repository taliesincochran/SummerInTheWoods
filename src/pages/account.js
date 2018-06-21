import React from 'react';
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';

class AccountPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			userObject: {}
		}
	}
	componentDidMount() {
		console.log(this.state);
	}
	render() {
		<div />
	}
}
