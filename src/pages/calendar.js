import React from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';

class Calendar extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			events:[
			{
				title: "The Day-Long Feast!",
				start: "2018-06-18"
			},
			{
				title: "Four-Day Orientation",
				start: "2018-06-06",
				end: "2018-06-10"
			},
			{
				title: "Group 4",
				start: "2018-06-19",
				end: "2018-06-23"
			}
			]
		}
	}

	render(){
		return(
			<div id="account">
				<FullCalendar id="availability-calendar"
				header = 
					{{
						left: 'prev,next today',
						center: 'Available Dates',
						right: 'month,basicWeek,basicDay'
					}}
				weekends = {false}
				defaultView = {'month'}
				defaultDate={'2018-06-05'}
				showNonCurrentDates={true}
				navLinks = {true}
				events = {this.state.events}
				eventColor = {'red'}
				eventBackgroundColor = {'blue'}
				className={'button'}
				
				/>
			</div>
		);
	}
}

export default Calendar
