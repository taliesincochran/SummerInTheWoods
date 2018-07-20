import React from 'react';
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import { Redirect } from "react-router-dom"
import Checkbox from '../components/Checkbox'

class AdminApplicationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			userObject: {}
		}
	}
	componentDidMount() {
	}
	//handleSubmit(){
		// {
		// db.doCreateUser(userObject)
		// .then report success
		// .error
		// console.log(error)
		// }
	//}

render() {
		return(
		/*-!this.props.location.state?<Redirect to="/"/>:*/
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Administrator: View Applications" />
	            </Helmet>
	            <BannerLanding bannerClass="contactBanner" />
	            <div id="main">
	            {/*
	            	Some check to see if linked from application (see admin-application-view.js Line 61)
	            	if it is, draws in props from the state.
	            	<p>{Child's Name} {Child's Age} {Child's birthday}</p>
	            	<p>{Parent 1 Name}{Parent1 Phone Number}</p>
	                <p>{Parent 2 Name} {Parent2 Phone Number}</p>
	           		<p>{address}</p>
	           		<p>{Contact 1} {Contact 1 phone} {Contact 1 Relationship}</p>
	           		<p>{Contact 2} {Contact 2 phone} {Contact 2 Relationship}</p>
	                <p>{Physician} {Physician phone}</p>
	           		<p>{Dentist} {Dentist phone}</p>
	           		<p>{Username}??</p>
	           		<button value=Child'sLastname-birthdate onClick=handleSubmit>Make it Official</button>

	            */}
				</div>
	        </div>
		)
	}
}

//export default AdminParentAdd