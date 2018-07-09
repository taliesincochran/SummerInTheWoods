import React from 'react';

import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import '../../assets/scss/calendar/_reset.scss';
import '../../assets/scss/calendar/_variables.scss';
import '../../assets/scss/calendar/_styles.scss';
import '../../assets/scss/calendar/_toolbar.scss';
import '../../assets/scss/calendar/_month.scss';
import '../../assets/scss/calendar/_event.scss';
import '../../assets/scss/calendar/_agenda.scss';
import '../../assets/scss/calendar/_time-column.scss';
import '../../assets/scss/calendar/_time-grid.scss';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));
function Event({ event }) {
  return (
    <span>
      <button className={event.className} style={{boxShadow: 'none', whiteSpace: 'pre'}}>{event.title}</button>
    </span>
  )
}
function EventWithCheckbox ({event}) {
    return(
        <span className={event.className}/>)
}
let eventPopulate = (props)=>{
    console.log("Event List", props);
    let _props = props.location.state
    let eventTemp = [];
    //let propsToPass = [];
    for (var week in _props.campTimes[props.i]){
        let campWeek = _props.campTimes[props.i][week];
        campWeek.id = week;
        let available = campWeek.available - campWeek.pending;
        console.log('campweek', campWeek, "available", available)
        if(!campWeek.noCamp){     
            switch(available) {
                case 0:
                    campWeek.title = `Week ${week.slice(4)}: No slots available.                                   `
                    break;
                case 1: 
                    campWeek.title = `Week ${week.slice(4)}: 1 slot available.                                     `
                    break;
                default: 
                    capmWeek.title = `Week ${week.slice(4)}: ${available} slots available.                         `
                    break;
            }
        } else if (campWeek.noCamp && campWeek.noCampDescription) {
            campWeek.title = campWeek.noCampDescription
        } else {
            campWeek.title = "No camp this week."
        }
        console.log("available", week, available)
        available>0?campWeek.className = "available":campWeek.className = "no-vacancy";
        console.log(campWeek)
        eventTemp.push(campWeek);
    }
    return eventTemp;
}

const Selectable = (props) => {
    let eventArray = eventPopulate(props);
    console.log("These are the events", eventArray, props);
    const events = eventArray;
    const date = new Date(props.location.state.year, 5, 1);
    return(    
         <div>
            <h3 className="callout">
                {props.title}
            </h3>
            <div style={{margin: "50px", height: '50em'}}>
                <BigCalendar
                    showMultiDayTimes
                    selectable
                    events={events}
                    defaultView={BigCalendar.Views.MONTH}
                    defaultDate={props.defaultDate}
                    onSelectEvent={event => {
                        console.log(event);
                        console.log(props);
                        }
                    }
                    components={{event: Event}}

                    onSelectSlot={slotInfo =>
                     alert(
                       `selected slot: \n\nstart ${slotInfo.start.toLocaleString()}`  +
                         `\nend: ${slotInfo.end.toLocaleString()}` +
                         `\naction: ${slotInfo.action}`)
                    }
                    toolbar={false}

                />
            </div>
        </div>
)};    
export default Selectable

