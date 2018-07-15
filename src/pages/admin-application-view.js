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
		//db.getApplications
		//then apply to an array in state
		//set array of reviewed applications
		//set array of non-reviewed applications

		console.log(this.state);
	}

	//handleChange(application.key){
		//dbSetApplicationStatus
		//	if set to new, set to false
		//	else if new set to false
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
	                <div className="inner">
	                    Applications:
	                    <div id="application-checkbox">
	                    	<Checkbox name="new" value='true' checked ='true' className='float-left' value= "" onClick="" text="New Applications"/>	                    	
	                    	<Checkbox name="reviewed" value='true' checked ='false' className='float-left' value= "" onClick="" text="Old Applications"/>
	                    </div>
	                </div>
	                <div className="infobox">
	                	{/*-this.state.applicationArray.map((application,i)=>
	                	<div key = {application.childName + application.birthdate}>
	                		<p>{Child's Name} {Childs Age} {Childs Birthdate} {Childs Age}</p>
	                		<p>{Parent 1 Name} {Parent1 Phone Number}</p>
	                		<p>{Parent 2 Name} {Parent2 Phone Number}</p>
	                		<p>{address}</p>
	                		<p>{Contact 1} {Contact 1 phone} {Contact 1 Relationship}</p>
	                		<p>{Contact 2} {Contact 2 phone} {Contact 2 Relationship}</p>
	                		<p>{Physician} {Physician phone}</p>
	                		<p>{Dentist} {Dentist phone}</p>
	                		<button value=application.key onClick = handleChange>Set to reviewed</Button>
	                	*/}
	                </div>
	            </div>
	        </div>
		)
	}
}

export default AdminApplicationView