import React from 'react';
import Helmet from 'react-helmet';
import Banner from '../components/Banner'
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import BannerLanding from '../components/BannerLanding/'


class AccountPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			userObject: {},
			UserId: props
		}
	}
	componentDidMount() {

		console.log("state of account: " + this.state);
	}

	render() {
	    return(
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Account Page" />
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


export default AccountPage


