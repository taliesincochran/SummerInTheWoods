import React from 'react';
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'


class AdminCalendarEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			campTimes: this.props.location.state.rawCampTimes
		}
	}
	componentDidMount() {
		console.log(this.state);
		let yearArray = [];
	    let year = this.props.location.state.year;
    	let months = ["June", "July", "August"];
    	let dates = months.map((month, i)=> new Date(year, i + 5, 1))
    	let views = []
    	for(var i = 0; i<months.length; i++) {
        	let month = months[i];
        	let date = dates[i];
        	views.push({month,date})
    	}
	}
	render() {		
	    return(
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Admin Calendar Page" />
	            </Helmet>
	            <BannerLanding bannerClass="contactBanner" />
	            <div id="main">
	                <div className="inner">
	                    {views.map(view=>
	                        <Selectable {...props} title={view.month} defaultDate={view.date} />                        
	                    )}
	                </div>
	            </div>
	        </div>
	    )
	}
}

export default AdminCalendarEditor