import * as React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding';
import { ref, changeTargetChild } from '../firebase/db';

class AdminCalendarEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			campTimes: '',
			views: [],
			months: ["June", "July", "August"]
		}
	}
	handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    // find monday will find the monday of the week entered. Day is a number from 0-6 with Sunday as 0.
    getDateFromSubmission = (inputDate) => {
    	const dateArray = inputDate.split('-');
    	const date = new Date(dateArray[0], dateArray[1], dateArray[2]);
    	return date;
    }
    handleSubmit = (event) => {
    	event.preventDefault();
    	let { firstDay, numberOfWeeks, year } = this.state;
    	let weeks = this.setUpNewYear(firstDay, numberOfWeeks, year);
    }
	isJuly4thWeek = (date, month) => {
	    const testDate1 = date - 1;
	    const testDate2 = date + 6;
	    if((testDate1 <= 4 && testDate2 >= 4 && month === 6) || (testDate1 >= 28 && month === 5 && testDate2 >= 34)) {
	        return true;
	    } else {
	        return false
	    }
	};
	getDateString = (year, month, date) =>  {
	    const dateString = new Date (year, month, date, 12, 0, 0, 0);
	    console.log(dateString);
	    return dateString;
	};
	setupNewYear = (firstDay, numberOfWeeks, year) => {
		// Get dates as javascript date string
		let firstFullDate = this.getDateString(year, 5, firstDay);
		// Get the date, month, and year of the first day
		let mondayDate = firstFullDate.getDate();
		let mondayMonth = firstFullDate.getMonth();
		let campYear = year;
		// Take this information to correct in case first day is not a Monday
		// Get total count of time at camp
		let dayCount = 7 * (numberOfWeeks);
		// Initialize the days with the first monday being 1 and the first friday being 5;
		let mondayArray = [firstDay];
	    let monday = firstDay;
	    for(let i = 0; i < numberOfWeeks - 1; i++) {
	        monday = monday + 7;
	        mondayArray.push(monday);
	        console.log("MondayArray", mondayArray);
	    }
	    let weeks = [];
	    let mondayString;
	    let currentMonday = mondayDate;
	    let weekNumber;
	    let currentFriday = mondayDate + 5;
	    let weekObject = {};
	    let firstFridayMonth = mondayDate > 26 ? 5 : 6;
	    let fridayMonth = firstFridayMonth;
	    console.log(mondayMonth, fridayMonth, mondayDate, currentMonday, currentFriday)
	    mondayArray.forEach((monday, i) => {
	        let day = monday;
	        let day2 = monday + 4;
	        const test = this.isJuly4thWeek(day, mondayMonth);
	        console.log(test);
			let weekNumber = (i + 1).toString(16);
	        let keyName = `Week${weekNumber}`;
	        if(day > 61) {
	            currentMonday = monday - 61;
	            if(mondayMonth === 6) {
	                mondayMonth = 7;
	            }
	        } else if (day > 30) {
	            currentMonday = monday - 30;
	            if(mondayMonth === 5) {
	                mondayMonth = 6;
	            }
	        } else {
	        	mondayMonth = 5;
	        	currentMonday = monday;
	        }
	        if(day > 57) {
	            currentFriday = monday - 57;
	            if(fridayMonth === 6) {
	                fridayMonth = 7;
	            }
	        } else if (day > 26) {
	            currentFriday = monday - 26;
	            if(fridayMonth === 5) {
	                fridayMonth = 6;
	            }
	        } else {
	        	currentFriday = monday + 4;
	        	fridayMonth = 5;

	        }
	        if(!test) {
	            weekObject = {
					'start': `${this.getDateString(campYear, mondayMonth, currentMonday)}`,
					'end': `${this.getDateString(campYear, fridayMonth, currentFriday)}`,
					'available': '18',
					'approved': '0',
	                'title': keyName,
	                'pending': 0
	            }
	        } else {
	            weekObject = {
	                'start': `${this.getDateString(campYear, mondayMonth , currentMonday)}`,
					'end': `${this.getDateString(campYear, fridayMonth, currentFriday)}`,
					'available':'0',
					'approved': '0',
	                'title': keyName,
	                'noCamp': 'true',
	                'noCampDescription': "No Camp on the week of July 4th",
	                'pending': '0'
	            }
			}
			console.log(weekObject)
	        weeks.push(weekObject);
	    });
	   	weeks.forEach((week,i) => {
			changeTargetChild(`campTimes/year/${campYear}`, week.title, weeks[i]);
	   	})
	    console.log(weeks);
	}
	getDateFromInput = (inputDate) => {
		const dateArray = inputDate.split('-');
	    const date = new Date(dateArray[0], dateArray[1], dateArray[2], 12, 0, 0, 0);
		return date;
	}
	componentDidMount() {
		console.log(this.state);
		if(this.props.location.state){
			let yearArray = [];
		    const year = this.props.location.state.year;
		    const rawCampTimes= this.props.location.state.rawCampTimes
	    	const months = ["June", "July", "August"];
	    	const weeks = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6', 'Week7', 'Week8', 'Week9', 'WeekA', 'WeekB'];
	    	const weeksRef = ref('campTimes/year/2019');
	    	const minDate = new Date()
		}
		if(process.env.NODE_ENV === 'production') {
			console.log('production');
		} else {
			// this.setupNewYear(14, 11, 2019);
		}
	};
	render() {	
		return(
			<div>
			 	<Helmet>
	                <title>Summer In The Woods</title>
	                <meta name="description" content="Admin Calendar Page" />
	            </Helmet>

	            <BannerLanding bannerClass="contactBanner" />
	            <div id="main">

		            <form id="firstDayOfCamp">
		                <div className="inner">
			                <label htmlFor="firstMonth" />What is the first day of camp?
			                <input name="firstDay" type="date" onChange={this.handleChange} />
			                <label htmlFor="numWeeks" />What is the last day of camp?
			                <input name="numWeeks" type="number" onChange={this.handleChange} />
							<label htmlFor="July4th">Please Select any weeks that you wish to not have camp.</label>
			                <input name="July4th" type="checkbox" />
			                <button type="submit" onSubmit={this.onSubmit}>Submit</button>
		                </div>
		            </form>
	            </div>
			</div>
		)
	}
}

export default AdminCalendarEditor;