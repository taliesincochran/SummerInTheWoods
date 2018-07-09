import React from 'react';
import Selectable from '../Selectable'
const YearCalendar = (props) => {
    let _props = props.location.state;
    let year = _props.chosenYear;
    let year2 = (parseInt(_props.chosenYear) + 1).toString();
    console.log("years", year, year2)
    let months = ["June", "July", "August"];
    let dates = months.map((month, i)=> new Date(year, i + 5, 1))
    let views = []
    for(var i = 0; i<months.length; i++) {
        let month = months[i];
        let date = dates[i];
        views.push({month,date})
    }
    console.log("YearCalendar views", views)
    return(
        <div>
            {views.map(view=>
                <Selectable {...props} year={props.year} title={view.month} defaultDate={view.date} hasCheckbox={true}/>                        
            )}
        </div>
    )
}

export default YearCalendar