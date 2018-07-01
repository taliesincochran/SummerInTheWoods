import React from 'react';
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'


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
		console.log(this.state);
	}
	render() {
	    return(
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Contact Page" />
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