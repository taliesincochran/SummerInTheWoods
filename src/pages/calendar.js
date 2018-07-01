import React from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import '../assets/scss/calendar/reset.css';
import '../assets/scss/calendar/variables.css';
import '../assets/scss/calendar/styles.css';
import '../assets/scss/calendar/toolbar.css';
import '../assets/scss/calendar/month.css';
import '../assets/scss/calendar/event.css';
import '../assets/scss/calendar/agenda.css';
import '../assets/scss/calendar/time-column.css';
import '../assets/scss/calendar/time-grid.css';
// import '../assets/scss/calendar/reset.css';
// import '../assets/scss/calendar/variables.css';
// import '../assets/scss/calendar/styles.css';
// import '../assets/scss/calendar/toolbar.css';
// import '../assets/scss/calendar/month.css';
// import '../assets/scss/calendar/event.css';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));


const Selectable = (props) => {
const events = [
	{
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    data:"Fipper Slapee Golgomacken",
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
    color: 'red',
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  }
];
	return(
	
  <div>
    <h3 className="callout">
      Click an event to see more info, or drag the mouse over the calendar to
      select a date/time range.
    </h3>
    <BigCalendar
      selectable
      events={events}
      defaultView={BigCalendar.Views.MONTH}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date(2015, 3, 12)}
      height = {800}
      onSelectEvent={event => {
        console.log(event);
        console.log(props);
      }
      }
      onSelectSlot={slotInfo =>
        alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`)
        }
            />

  		</div>
        )
      }	



export default Selectable