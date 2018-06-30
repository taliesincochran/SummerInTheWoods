import React from 'react';
import FullCalendar from 'fullcalendar';
import $ from 'jquery';

class Calendar extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			events:[
			{
				id:4,
				title: "The Day-Long Feast!",
				start: "2018-06-18",
				
			},
			{
				id:7,
				title: "Four-Day Orientation",
				start: "2018-06-06",
				end: "2018-06-10"
			},
			{
				id:7,
				title: "Group 4",
				start: "2018-06-19",
				end: "2018-06-23"
			}
			]
		}
	}


	updateEvents(eventList) {

		$('#calendar').fullCalendar('destroy');
		$('#calendar').fullCalendar({
			id:'availability-calendar',
			header: {left: 'prev,next'},
			weekends:false,
			editable:false,
			navLinks:true,
			showNonCurrentDates:true,
			defaultView: 'month',
			defaultDate: '2018-06-05',
			events: eventList,
			contentHeight: 'auto',
			eventColor: 'red',
			eventBackgroundColor:'blue'

		});	
	}

	componentDidMount=()=>{
		this.updateEvents(this.state.events);
	}

	componentDidUpdate=()=> {
    	this.updateEvents(this.state.events);
  	}

	render(){
		return(
			<div id='calendar'>
			Dumpster Fire.
			Terrible Garbage Dump!
			{/*<FullCalendar
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
				/>*/}

			</div>
		)
	}
}

export default Calendar