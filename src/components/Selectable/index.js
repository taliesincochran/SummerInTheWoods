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

let eventPopulate = (events)=>{
    console.log("Event List", events);
    let eventTemp = [];
    //let eventsToPass = [];
    for (var week in events.location.state.campTimes[0]){
        let campWeek = events.location.state.campTimes[0][week];
        campWeek.id = week;
        let available = campWeek.available - campWeek.pending 
        campWeek.title = week + ":  " + available + " slots are still available";
        campWeek.allDay = available?true:false;
        console.log(campWeek)
        eventTemp.push(campWeek);
    }
    return eventTemp;
}

const customDayPropGetter = date => {

    if ((available - pending) > 0) return {
          className: 'available',
          style: {
            backgroundColor: "green"
          },
    }
    else return {
        className: 'notAvailable',
        style: {
          backgroundColor: "red"
        }
    }
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
            <div style={{margin: "50px", height: '30em'}}>
                <BigCalendar
                    showMultiDayTimes
                    selectable
                    events={events}
                    defaultView={BigCalendar.Views.MONTH}
                    steps={1}
                    // views={["months"]}
                    step={1 * 60}
                    defaultDate={props.defaultDate}
                    onSelectEvent={event => {
                        console.log(event);
                        console.log(props);
                        }
                    }
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

