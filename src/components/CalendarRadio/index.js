import React from 'react'
const CalendarRadio = props => {
	return(
		<div className="3u 6u$(small) float-left">
            <p>{props.date}</p>
            <input type="radio" id={props.id3day} name={props.name} value='3day'></input>
            <label for="5dayWeek1">3 day</label>
            <input type="radio" id={props.id5day} name={props.name} value="5day"></input>
            <label for="3dayWeek1">5 day</label>
        </div>
	)
	
}export default CalendarRadio
