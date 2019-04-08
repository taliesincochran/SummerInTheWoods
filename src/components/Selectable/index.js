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

let localizer = BigCalendar.momentLocalizer(Moment);

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
    console.log('event fired', props)
    const { index, campTimes } = props;
    console.log('index', index, campTimes)
    let year = props.year;
    //let propsToPass = [];
    let thisYearCampTimes = campTimes[index]
    let events = Object.keys(campTimes).map(week=> {
        console.log('event week', week)
        let campWeek = campTimes[week];
        let idNumber = parseInt(week.slice(4), 16);
        campWeek.id = 'week' + idNumber + year;
        let available = campWeek.available - campWeek.approved;
        if(!campWeek.noCamp){
            switch(available) {
                case 0:
                    campWeek.title = `Week ${idNumber}: No spaces available.                                   `
                    break;
                case 1:
                    campWeek.title = `Week ${idNumber}: 1 space available.                                     `
                    break;
                default:
                    campWeek.title = `Week ${idNumber}: Limited spaces available.                         `
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

        return campWeek;
    });
    return events;
}

const Selectable = (props) => {
    const events = eventPopulate(props);
    console.log('selectable props', props, events)
    return(
         <div>
            <h3 className="callout">
                {props.title}
            </h3>
            <div style={{margin: "50px", height: '50em'}}>
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    defaultView={BigCalendar.Views.MONTH}
                    defaultDate={props.defaultDate}
                    components={{event: Event}}
                    toolbar={false}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </div>
)};
export default Selectable

