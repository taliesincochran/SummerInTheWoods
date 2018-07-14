import React from 'react';
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import Selectable from '../components/Selectable'
import { Redirect } from "react-router-dom"

class AdminCalendarEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			campTimes: '',
			views: []
		}
	}
	componentDidMount() {
		console.log(this.state);
		if(this.props.location.state){
			let yearArray = [];
		    let year = this.props.location.state.year;
		    let rawCampTimes= this.props.location.state.rawCampTimes
	    	let months = ["June", "July", "August"];
	    	let dates = months.map((month, i)=> new Date(year, i + 5, 1))
	    	let views = []
	    	for(var i = 0; i<months.length; i++) {
	        	let month = months[i];
	        	let date = dates[i];
	        	views.push({month,date})
	    	}
	    	this.setState({views, rawCampTimes})
	    }
	}
	render() {	
		return(
		!this.props.location.state?<Redirect to="/"/>:	
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Admin Calendar Page" />
	            </Helmet>
	            <BannerLanding bannerClass="contactBanner" />
	            <div id="main">
	                <div className="inner">
	                    {this.state.views.map(view=>
	                        <Selectable {...this.props} title={view.month} defaultDate={view.date} />                        
	                    )}
	                </div>
	            </div>
	        </div>
		)
	}
}

export default AdminCalendarEditor