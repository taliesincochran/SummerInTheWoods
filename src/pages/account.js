import React from 'react';
import Helmet from 'react-helmet';
import Banner from '../components/Banner'
import { db } from '../firebase'
import PasswordChangeForm from '../components/PasswordChange';
import BannerLanding from '../components/BannerLanding/'
import moment from 'moment'


class AccountPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			userObject: {},
			UserId: props
		}
		this.setSchedule = this.setSchedule.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	setSchedule(weekArray, appliedLength){
		// console.log("the array of week objects", weekArray);
		// console.log("The object of stay lengths: ", appliedLength);
		// let weekStarts=[];
		// let weekDate;
		// for (let weeks in weekArray) {
		// 	weekDate=moment(weekArray[weeks].start).format('LL');
		// 	weekStarts.push(weekDate);
		// }
		// let appliedWeeks = [];
		// console.log("the starting dates", weekStarts);
		// for (let weekApply in this.props.history.location.state.applications[0]){
		// 	if (weekApply.slice(0,4) == "Week"){
		// 		appliedWeeks.push(this.props.history.location.state.applications[0][weekApply]);
		// 	}
		// }
		// let appliedWeekIndices =[];
		// console.log("the weeks that have been applied for: ", appliedWeeks);
		// for (let i = 0; i < appliedWeeks.length; i++){
		// 	if (appliedWeeks[i]>0.5){
		// 		appliedWeekIndices.push([i])
		// 	}
		// }
		// appliedWeeks = [];
		// let appliedWeeksLength = [];
		// let appliedLengthArray=Object.keys(appliedLength)
		// console.log(appliedLengthArray)
		// appliedLengthArray.forEach(key => {
		// 	if (key.slice(0,4) == "Week"){
		// 		if (parseInt(appliedLength[key])>1) {
		// 			appliedWeeksLength.push(parseInt(appliedLength[key]))
		// 		} else console.log("fail")
		// 	}
		// })
		// for (let j = 0; j< appliedWeekIndices.length; j++){
		// 	appliedWeeks.push(<p>{weekStarts[appliedWeekIndices[j]]} for {appliedWeeksLength[j]} days.</p>);
		// }
		// return(
		// 	<div>
		// 		{appliedWeeks}
		// 	</div>
		// 	)
	}

	handleClick(){
		const {history,} = this.props.history.location.state;
		let applicationData = this.props.history.location.state;
		let route = routes.APPLY

	}

	componentDidMount() {

	}


	render() {
		console.log("These are the props!", this.props);
		console.log("user info ", this.props.history.location.state);
	    return(
	        <div>
	            <Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Account Page" />
	            </Helmet>
	            <BannerLanding bannerClass="contactBanner" />
	            <div id="main">
	                <div className="inner">
	                	<div className="greeting">
	                    Hello, {this.props.history.location.state.applications[0].parent1Name}!
	                    </div>
	                    <div className="pending-section">
	                    You have an application with the following dates pending:
	                    	<div className="pending">
	                    		{this.props.history.location.state.applications[0].chosenYear == "2019"?
	                    		//this.setSchedule(this.props.history.location.state.weekTime[0], this.props.history.location.state.applications[0])
	                    		:
	                    		//this.setSchedule(this.props.history.location.state.weekTime[0], this.props.history.location.state.applications[0])
	                    	}
	                    	</div>
	                    </div>
	                </div>
	                <div className = "change-info-section">
	                	<p>If you need to change any of the information on your child's application, please select the button below:</p>
	                	<button className= "button" id = "review" onClick={this.handleClick}>
	                		Change Information
	                	</button>
	                </div>
	            </div>
	        </div>
	    )
	}
}


export default AccountPage


