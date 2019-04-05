import * as React from "react";
import BigCalendar from 'react-big-calendar';
import * as  Moment from 'moment/moment';
import '../../assets/scss/calendar/_reset.scss';
import '../../assets/scss/calendar/_variables.scss';
import '../../assets/scss/calendar/_styles.scss';
import '../../assets/scss/calendar/_toolbar.scss';
import '../../assets/scss/calendar/_month.scss';
import '../../assets/scss/calendar/_event.scss';
import '../../assets/scss/calendar/_agenda.scss';
import '../../assets/scss/calendar/_time-column.scss';
import '../../assets/scss/calendar/_time-grid.scss';

BigCalendar.momentLocalizer(Moment);

const Event = ({ event }) => {
  return (
    <span>
      <button className={event.className} style={{boxShadow: 'none', whiteSpace: 'pre'}}>{event.title}</button>
    </span>
  )
}
const EventWithCheckbox = ({event}) => {
    return(
        <span className={event.className}/>)
}
let eventPopulate = (props)=>{
    console.log('event fired')
    let year = props.year
    let _props = props.location.state
    let eventTemp = [];
    //let propsToPass = [];
    for (var week in props.campTimes){
        let campWeek = props.campTimes[week];
        campWeek.id = week + year;
        let available = campWeek.available - campWeek.approved;
        if(!campWeek.noCamp){
            switch(available) {
                case 0:
                    campWeek.title = `Week ${parseInt(week.slice(4), 16)}: No spaces available.                                   `
                    break;
                case 1:
                    campWeek.title = `Week ${parseInt(week.slice(4), 16)}: 1 space available.                                     `
                    break;
                default:
                    campWeek.title = `Week ${parseInt(week.slice(4), 16)}: Limited spaces available.                         `
                    break;
            }
        } else if (campWeek.noCamp && campWeek.noCampDescription) {
            campWeek.title = campWeek.noCampDescription
        } else {
            campWeek.title = "No camp this week.                                                                          "
        }
        available > 0
            ?
            campWeek.className = "available"
            :
            campWeek.className = "no-vacancy";

        eventTemp.push(campWeek);
    }
    return eventTemp;
}

const Selectable = (props) => {
    let eventArray = eventPopulate(props);
    const events = eventArray;
    const date = new Date(props.year, 5, 1);
    return(
         <div>
            <h3 className="callout">
                {props.title}
            </h3>
            <div style={{margin: "50px", height: '50em'}}>
                <BigCalendar
                    events={events}
                    defaultView={BigCalendar.Views.MONTH}
                    defaultDate={props.defaultDate}
                    components={{event: Event}}
                    toolbar={false}
                />
            </div>
        </div>
)};
export default Selectable

