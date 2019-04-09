import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from '@reach/router';
import Selectable from '../components/Selectable';
import Checkbox from '../components/Checkbox';
import { withFirebase, FirebaseContext } from '../components/Firebase';
class CalendarBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            render2: false,
            month: 5,
            chosenYear: (new Date()).getFullYear()
        };
    }
    static contextType = FirebaseContext;
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
        const weekArray = this.getWeeks(this.props.firebase.state.data.rawCampTimes[chosenYear], chosenYear);
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
    componentDidUpdate(prevProps) {
        console.log('update', prevProps, this.props)
        if(prevProps.firebase === undefined) {
            return true;
        }
    }
    render() {
        return(
            (this.props && this.props.firebase && this.props.firebase.state && this.props.firebase.state.data)?
            <React.Fragment>
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Calendar Page" />
                </Helmet>
                <div id="main">
                    {console.log('inside calendar', this)}
                    {(this.props.firebase.state.data.yearsArray && this.props.firebase.state.data.yearsArray.length > 1)?
                        <div>
                            <Checkbox
                                style={{display: "inline-block"}}
                                name="year1"
                                onChange={() => this.handleYearSelect(this.props.firebase.state.data.yearsArray[0])}
                                checked={(this.state.chosenYear?this.state.chosenYear:this.props.firebase.state.data.chosenYear) === this.props.firebase.state.data.yearsArray[0]}
                                className='float-left'
                                value={this.props.firebase.state.data.yearsArray[0]}
                                onClick={() => this.handleYearSelect(this.props.firebase.state.data.yearsArray[0])}
                                text={this.props.firebase.state.data.yearsArray[0]}
                            />
                            <Checkbox
                                style={{display: "inline-block"}}
                                name="year2"
                                value={this.props.firebase.state.data.yearsArray[1]}
                                onChange={() => this.handleYearSelect(this.props.firebase.state.data.yearsArray[0])}
                                checked={(this.state.chosenYear? this.state.chosenYear: this.props.firebase.state.data.chosenYear) === this.props.firebase.state.data.yearsArray[1]}
                                className='float-left'
                                onClick={() => this.handleYearSelect(this.props.firebase.state.data.yearsArray[1])}
                                text={this.props.firebase.state.data.yearsArray[1]}
                            />
                        </div>
                    :(this.props.firebase.state.data.yearsArray && this.props.firebase.state.data.yearsArray.length === 1)?
                        <div>
                            <Checkbox
                                style={{display: "inline-block"}}
                                name="year1"
                                value={this.props.firebase.state.data.yearsArray[0]}
                                    onChange={() => this.handleYearSelect(this.props.firebase.state.data.yearsArray[0])}
                                checked={true}
                                className='float-left'
                                onClick={() => this.handleYearSelect(this.props.firebase.state.data.yearsArray[0])}
                                text={this.props.firebase.state.data.yearsArray[0]}
                            />
                        </div>
                    :null
                }
                    <div>
                        <Checkbox
                            name="June"
                            value={5}
                            onChange={()=> this.handleMonthSelect(5)}
                            checked={this.state.month === 5}
                            style={{display: "inline-block"}}
                            onClick={() => this.handleMonthSelect(5)}
                            text="June"
                        />
                        <Checkbox
                            name="July"
                            onChange={()=> this.handleMonthSelect(6)}
                            checked={this.state.month === 6}
                            style={{display: "inline-block"}}
                            value={6}
                            onClick={() => this.handleMonthSelect(6)}
                            text="July"
                        />
                        <Checkbox
                            name="August"
                            onChange={()=> this.handleMonthSelect(7)}
                            checked={this.state.month === 7}
                            style={{display: "inline-block"}}
                            value={7}
                            onClick={() => this.handleMonthSelect(7)}
                            text="August"
                        />
                    </div>
                    <div className="inner">
                        {(this.props.firebase.state.data.views && this.props.firebase.state.data.views.length > 0 && this.props.firebase.state.data.campTimes && this.props.firebase.state.data.campTimes[0] && this.props.firebase.state.data.yearsArray && (this.state.chosenYear?this.state.chosenYear:this.props.firebase.state.data.chosenYear))?
                            (parseInt(this.state.chosenYear) === parseInt(this.props.firebase.state.data.yearsArray[0]))?
                                this.props.firebase.state.data.views.map((view, i)=>{
                                    let campTimes = this.props.firebase.state.data.campTimes[0]; 
                                    return(
                                    this.state.month === i + 5?
                                        <Selectable
                                            key={i}
                                            year={this.state.chosenYear}
                                            index={0}
                                            title={view.month}
                                            defaultDate={view.date}
                                            {...this.props}
                                        />
                                    :null)}
                                )
                            :null
                        :null
                        }
                        {(this.props.firebase.state.data.views2 && this.props.firebase.state.data.views2.length > 0 && this.props.firebase.state.data.campTimes && (this.props.firebase.state.data.campTimes.length > 1) && this.props.firebase.state.data.yearsArray)?
                                (parseInt(this.state.chosenYear) === parseInt(this.props.firebase.state.data.yearsArray[1]))?
                                this.props.firebase.state.data.views2.map((view, i)=>
                                    this.state.month === i + 5?
                                        <Selectable
                                            key={i}
                                            year={this.props.firebase.state.data.yearsArray[1]}
                                            campTimes={this.props.firebase.state.data.campTimes[1]}
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
            </React.Fragment>: null
        )
    }
}
const Calendar = withFirebase(CalendarBase);


export default Calendar;