import React from 'react';
import { getFirebase } from './index';

const defaultContextValue = {
  data: {
  },
  firebase: {
  },
  setData: () => {
  },
};

const firebase = React.createContext(defaultContextValue);

export class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props);
    this._initFirebase = false;
    this.setData = this.setData.bind(this);
    this.state = {
      set: this.setData,
      data: {},
      firebase: {}
    };
    // this.data = {}
    // this.calendarData = {};
    // this.firebase = {};

    // this.firebaseInit = this.firebaseInit.bind(this);
  }
  componentDidMount() {
    console.log('firebase context mounted', this.state);
    // this.firebaseInit();
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '', });
    }, 100);
    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);
      // this.firebase = firebase;
      firebase.getCalendar().then(data => {
        this.setState({firebase, data}) 
        // this.setData(firebase);
        // this.data = data;
        // this.calendarData = data;
        console.log('firebase context this', this)
        console.log('firebase setData', )
      })
      // this.setState({ firebase, campTimes });
      // this.data = campTimes;
    });
    console.log('after firebase promise', this)
  }
  componentDidUpdate() {
    console.log('firebase context updated', this.state);
  }
  componentWillUnmount() {
    console.log('firebase context unmounted', this.state);
  }
  // firebaseInit = () => {
  //   if (this.props.firebase && !this._initFirebase) {
  //     this._initFirebase = true;

  //     this.props.firebase.users().on('value', snapshot => {
  //       this.setState({
  //         users: snapshot.val(),
  //       });
  //     });
  //     this.getCalendar(this.props.firebase);
  //   }
  // };
  // getCalendar = (rawCampTimes) => {
  //   let length = 0;
  //   if (rawCampTimes) {
  //     let keys = Object.keys(rawCampTimes);
  //     length = keys.length;
  //   }
  //   if (length > 0) {
  //     // get current date, month, year
  //     let dateObject = new Date();
  //     let date = dateObject.getDate();
  //     let month = dateObject.getMonth();
  //     let year = dateObject.getFullYear();
  //     // get the timezone of the applicant for security purposes
  //     let localTimezoneOffset = dateObject.getTimezoneOffset()
  //     // data from firebase to be processed into the year or years to be displayed
  //     let rawYearsArray = Object.keys(rawCampTimes['year']);
  //     rawYearsArray.sort((a, b) => a - b);
  //     console.log('raw 444444444444444', rawYearsArray);
  //     let yearIndex = 0;
  //     let chosenYear = year.toString();
  //     //if the date is already past the last week start date, don't display current year
  //     if (month > 7 && date > 8) {
  //       yearIndex = rawYearsArray.indexOf((year + 1).toString());
  //       chosenYear = (year + 1).toString();
  //     } else {
  //       yearIndex = rawYearsArray.indexOf(year.toString())
  //     }
  //     //Get rid of any data that is outdated
  //     let yearsArray = rawYearsArray.slice(yearIndex)
  //     //Make an array of relavent camptimes
  //     let campTimes = yearsArray.map(thisYear => {
  //       let campTime = rawCampTimes['year'][thisYear];
  //       return campTime;
  //     });
  //     const views = this.getViews(parseInt(chosenYear));
  //     const views2 = this.getViews((parseInt(chosenYear) + 1));
  //     const weekArray = this.getWeeks(rawCampTimes['year'][chosenYear], parseInt(chosenYear));
  //     this.setData({
  //       campTimes,
  //       rawCampTimes,
  //       date,
  //       month,
  //       year,
  //       localTimezoneOffset,
  //       yearsArray,
  //       chosenYear,
  //       views,
  //       views2,
  //       weekArray
  //     });

  //   } else {
  //     console.log('Get Calendar failed', this.props, this.state)
  //   }
  // }

  // getWeeks(yearChosen, yearString) {
  //   let weekArray = [];
  //   let year = yearString;
  //   for (let weekChosen in yearChosen) {
  //     let week = weekChosen;
  //     let { start, end, available, pending, noCamp } = yearChosen[week]
  //     start = new Date(start);
  //     start = start.getMonth() + "/" + start.getDate();
  //     end = new Date(end);
  //     end = end.getMonth() + "/" + end.getDate();
  //     weekArray.push({ week, year, start, end, available, pending, noCamp })
  //   }
  //   return weekArray
  // }
  // getViews = (year) => {
  //   let months = ["June", "July", "August"];
  //   let dates = months.map((month, i) => {
  //     let monthInt = i + 5;
  //     return new Date(year, monthInt, 1);
  //   });
  //   let views = [];
  //   for (var i = 0; i < months.length; i++) {
  //     let month = months[i];
  //     let date = dates[i];
  //     views.push({ month, date, i })
  //   }
  //   return views;
  // }
  setData (newData) {
    console.log('set data called', newData)
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }), () => {console.log('firebase state', this.state)})
  }
  render() {
    return (
    <firebase.Provider
      value={{
        state: this.state,
        setData: this.setData,
        firebase: this.firebase,
        calendarData: this.calendarData
      }}
    >
      {this.props.children}
    </firebase.Provider>
    )}
};
export const withFirebase = Component => props => {
  console.log('withFirebase', props);
  return (
  <firebase.Consumer>
    {firebase => {
      console.log('inside firebase', firebase, props);
      return (
        <Component {...props} firebase={firebase} />
      )}}
  </firebase.Consumer>
)};

export default firebase;
