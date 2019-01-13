import React from 'react';
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import { Redirect } from "react-router-dom"

class AdminParentAccounts extends React.Component {
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
	render() {
		return(
		!this.props.location.state?<Redirect to="/"/>:
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Admin: Parent Acounts Page" />
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

export default AdminParentAccounts