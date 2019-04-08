import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from '@reach/router';
import Selectable from '../components/Selectable';
import Checkbox from '../components/Checkbox';
import { withFirebase, FirebaseContext } from '../components/Firebase';
import { isRegExp } from 'util';
// import { getCalendar, firebaseInit } from '../constants/helper'
class CalendarBase extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            campTimes: [],
            views: [],
            views2: [],
            year: '',
            yearsArray: [],
            weekArray: [],
            chosenYear: '',
            rawCampTimes: {},
            month: 5,
            render: false,
            render2: false
        }
    }
    static contextType = FirebaseContext;
    componentDidUpdate() {
        console.log('5555555555555555',   )
    }
    componentDidMount() {
        // this.props.firebase.getValue('/campTimes/year/').then(rawCampTimes => {
        //     this.getCalendar(rawCampTimes);
        //     console.log('calendar mount', this.state, this.props)
        // })
        let data = this.context;
        console.log('calendar mounting', this.props, data)
        // this.getCalendar(this.props.firebase);
        // this.createViews(this.state.render);
        // this.setState({render: true})
    }
    // createViews = () => {
    //     const { chosenYear } = this.props;
    //     console.log('create views', chosenYear)
    //     let views = [] 
    //     let views2 = []
    //     let render = false;
    //     if(chosenYear !== undefined && !isNaN(parseInt(chosenYear))) {
    //         views = this.getViews(parseInt(chosenYear));
    //         views2 = this.getViews((parseInt(chosenYear) + 1));
    //         render = true;
    //     }
    //     const weekArray = this.getWeeks(this.props.rawCampTimes[chosenYear], parseInt(chosenYear));
    //     this.setState({ views, views2, weekArray}, () => {
    //         this.props.firebase.set(this.props);
    //         console.log('firebase props', this.props.firebase.data);
    //     });
    // }
    // getWeekArray = (yearString) => {
    //     // let firebase = this.props.firebase;
    //     // let rawCampTimes = firebase.getValue(`/campTimes/year/${yearString}`);
    //     const { rawCampTimes } = this.props;
    //     let yearChosen = rawCampTimes[yearString];
    //     let weekArray = [];
    //     let year = yearString;
    //     for (let weekChosen in yearChosen) {
    //         let week = weekChosen;
    //         let { start, end, available, pending, noCamp, approved } = yearChosen[week]
    //         start = new Date(start);
    //         start = (parseInt(start.getMonth()) + 1) + "/" + start.getDate();
    //         end = new Date(end);
    //         end = (parseInt(end.getMonth()) + 1) + "/" + end.getDate();
    //         weekArray.push({ week, year, start, end, available, approved, pending, noCamp })
    //     }
    //     console.log(weekArray)
    //     return weekArray
    // }
    // getCalendar = (rawCampTimes) => {
    //     let length = 0;
    //     if (rawCampTimes) {
    //         let keys = Object.keys(rawCampTimes);
    //         length = keys.length;
    //     }
    //     if (length > 0) {
    //         // get current date, month, year
    //         let dateObject = new Date();
    //         let date = dateObject.getDate();
    //         let month = dateObject.getMonth();
    //         let year = dateObject.getFullYear();
    //         // get the timezone of the applicant for security purposes
    //         let localTimezoneOffset = dateObject.getTimezoneOffset()
    //         // data from firebase to be processed into the year or years to be displayed
    //         let rawYearsArray = Object.keys(rawCampTimes['year']);
    //         rawYearsArray.sort((a, b) => a - b);
    //         console.log('raw 444444444444444', rawYearsArray);
    //         let yearIndex = 0;
    //         let chosenYear = year.toString();
    //         //if the date is already past the last week start date, don't display current year
    //         if (month > 7 && date > 8) {
    //             yearIndex = rawYearsArray.indexOf((year + 1).toString());
    //             chosenYear = (year + 1).toString();
    //         } else {
    //             yearIndex = rawYearsArray.indexOf(year.toString())
    //         }
    //         //Get rid of any data that is outdated
    //         let yearsArray = rawYearsArray.slice(yearIndex)
    //         //Make an array of relavent camptimes
    //         let campTimes = yearsArray.map(thisYear => {
    //             let campTime = rawCampTimes['year'][thisYear];
    //             return campTime;
    //         });
    //         const views = this.getViews(parseInt(chosenYear));
    //         const views2 = this.getViews((parseInt(chosenYear) + 1));
    //         const weekArray = this.getWeeks(rawCampTimes['year'][chosenYear], parseInt(chosenYear));
    //         this.setState({
    //             campTimes,
    //             rawCampTimes,
    //             date,
    //             month,
    //             year,
    //             localTimezoneOffset,
    //             yearsArray,
    //             chosenYear,
    //             views,
    //             views2,
    //             weekArray
    //         });

    //     } else {
    //         console.log('Get Calendar failed', this.props, this.state)
    //     }
    // }
    getWeeks(yearChosen, yearString) {
        let weekArray = [];
        let year = yearString;
        for (let weekChosen in yearChosen) {
            let week = weekChosen;
            let { start, end, available, pending, noCamp } = yearChosen[week]
            start = new Date(start);
            start = start.getMonth() + "/" + start.getDate();
            end = new Date(end);
            end = end.getMonth() + "/" + end.getDate();
            weekArray.push({ week, year, start, end, available, pending, noCamp })
        }
        return weekArray
    }
    handleYearSelect = chosenYear => {
        const weekArray = this.getWeeks(this.props.rawCampTimes[chosenYear], chosenYear);
        const render = true;
        this.setState({
            chosenYear,
            weekArray,
            render
        });
    }
    handleMonthSelect = (month) => {
        this.setState({month})
    }
    // getViews = (year) => {
    //     console.log('getViews', year);
    //     let months = ["June", "July", "August"];
    //     let dates = months.map((month, i)=> {
    //         let monthInt = i + 5;
    //         console.log('month', monthInt)
    //         console.log(year, month, i, new Date(year, monthInt, 1));
    //         return new Date(year, monthInt, 1);
    //     });
    //     let views = [];
    //     for(var i = 0; i<months.length; i++) {
    //         let month = months[i];
    //         let date = dates[i];
    //         views.push({month, date, i})
    //     }
    //     return views;
    // }
    render() {
        let value = this.context;
        let firebase = this.firebase;
        console.log('render value', value, firebase)
        let data = {campTimes: [], yearsArray: [], views: [], views2: [], chosenYear: ''};
        if(this.props && this.props.firebase && this.props.firebase.data) {
            data = this.props.firebase.data;
        }
        let {campTimes, yearsArray, chosenYear, views, views2} = data;
        chosenYear = chosenYear.toString();
        let { month } = this.state;
        let { handleYearSelect, handleMonthSelect } = this;
        console.log('calendar render', this.props, chosenYear, yearsArray[0], this.context)
        // console.log('render calendar', this, this.props.firebase.state, this.state, this.context);
        return(
            <React.Fragment>
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Calendar Page" />
                </Helmet>
                <div id="main">
                    {console.log('inside calendar', this)}
                    {(yearsArray && yearsArray.length > 1)?
                        <div>
                            <Checkbox
                                style={{display: "inline-block"}}
                                name="year1"
                                onChange={() => handleYearSelect(yearsArray[0])}
                                checked={chosenYear === yearsArray[0]}
                                className='float-left'
                                value={yearsArray[0]}
                                onClick={() => handleYearSelect(yearsArray[0])}
                                text={yearsArray[0]}
                            />
                            <Checkbox
                                style={{display: "inline-block"}}
                                name="year2"
                                value={yearsArray[1]}
                                onChange={() => handleYearSelect(yearsArray[0])}
                                checked={chosenYear === yearsArray[1]}
                                className='float-left'
                                onClick={() => handleYearSelect(yearsArray[1])}
                                text={yearsArray[1]}
                            />
                        </div>
                    :(yearsArray && yearsArray.length === 1)?
                        <div>
                            <Checkbox
                                style={{display: "inline-block"}}
                                name="year1"
                                value={yearsArray[0]}
                                    onChange={() => handleYearSelect(yearsArray[0])}
                                checked={true}
                                className='float-left'
                                onClick={() => handleYearSelect(yearsArray[0])}
                                text={yearsArray[0]}
                            />
                        </div>
                    :null
                }
                <div>{JSON.stringify(value)}gggggggg</div>
                    <div>
                        <Checkbox
                            name="June"
                            value={5}
                            onChange={()=> handleMonthSelect(5)}
                            checked={month === 5}
                            style={{display: "inline-block"}}
                            onClick={() => handleMonthSelect(5)}
                            text="June"
                        />
                        <Checkbox
                            name="July"
                            onChange={()=> handleMonthSelect(6)}
                            checked={month === 6}
                            style={{display: "inline-block"}}
                            value={6}
                            onClick={() => handleMonthSelect(6)}
                            text="July"
                        />
                        <Checkbox
                            name="August"
                            onChange={()=> handleMonthSelect(7)}
                            checked={month === 7}
                            style={{display: "inline-block"}}
                            value={7}
                            onClick={() => handleMonthSelect(7)}
                            text="August"
                        />
                    </div>
                    <div className="inner">
                        {(views && views.length > 0 && campTimes && campTimes[0] && yearsArray && chosenYear)?
                            chosenYear === yearsArray[0]?
                                views.map((view, i)=>
                                    month === i + 5?
                                        <Selectable
                                            key={i}
                                            campTimes={campTimes[0]}
                                            year={yearsArray[0]}
                                            index={0}
                                            title={view.month}
                                            defaultDate={view.date}
                                            {...this.props}
                                        />
                                :null
                            )
                            :<div>bbb</div>
                        :<div>ccc</div>
                        }
                        {(views2 && views2.length > 0 && campTimes && campTimes.length > 1 && yearsArray)?
                            chosenYear === yearsArray[1]?
                                views2.map((view, i)=>
                                    month === i + 5?
                                        <Selectable
                                            key={i}
                                            year={yearsArray[1]}
                                            campTimes={campTimes[1]}
                                            index={1}
                                            title={view.month}
                                            defaultDate={view.date}
                                            {...this.props}
                                        />
                                    :null
                                )
                            :null
                        :null
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const Calendar = withFirebase(CalendarBase);


export default Calendar;