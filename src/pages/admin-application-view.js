import React from 'react';
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import { Redirect } from "react-router-dom"

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
		console.log(this.state);
	}
	render() {
		return(
		!this.props.location.state?<Redirect to="/"/>:
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Administrator: View Applications" />
	            </Helmet>
	            <BannerLanding bannerClass="contactBanner" />
	            <div id="main">
	                <div className="inner">
	                    To Do
	                </div>
	            </div>
	        </div>
		)
	}
}

export default AdminApplicationView