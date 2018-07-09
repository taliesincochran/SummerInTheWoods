import React from 'react'
import Helmet from 'react-helmet'
// import Moment from 'react-moment'
import { db } from '../firebase'
import BannerLanding from '../components/BannerLanding/'
import Checkbox from '../components/Checkbox'
import Selectable from '../components/Selectable'
import YearSelect from '../components/YearSelect'
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.location.state.date,
            month: this.props.location.state.month,
            year: this.props.location.state.year,
            yearsArray: this.props.location.state.yearsArray,
            chosenYear: this.props.location.state.year,
            numberOfChildren: 1,
            totalCost: 0,
            amountDue: 0,
            savings: 0,
            // localTimezoneOffset: props.loction.state.localTimezoneOffset,
            campTimezoneOffset: 4,
            localTimezoneOffset: this.props.location.state.localTimezoneOffset,
            campTimes: this.props.location.state.campTimes,
            rawCampTimes: this.props.location.state.rawCampTimes,
            Week1: 0,
            Week2: 0,
            Week3: 0,
            Week4: 0,
            Week5: 0,
            Week6: 0,
            Week7: 0,
            Week8: 0,
            weekArray: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleYearSelect = this.handleYearSelect.bind(this)
        this.handleWeekSelect = this.handleWeekSelect.bind(this)
        this.getWeeks =  this.getWeeks.bind(this)
    }
    componentDidMount() {
        let _props = this.props.location.state;
        let year = _props.year;
        let months = ["June", "July", "August"];
        let dates = months.map((month, i)=> new Date(year, i + 5, 1))
        let views = []
        for(var i = 0; i<months.length; i++) {
            let month = months[i];
            let date = dates[i];
            views.push({month,date})
        }
        this.setState({weekArray: this.getWeeks(_props.rawCampTimes[_props.chosenYear],_props.chosenYear), months, dates, views,})
        console.log('apply state and props', this.state, this.props)
    }
    getWeeks (yearChosen, yearString) {
        let weekArray = [];
        console.log("yearChosen", yearChosen);
        let year = yearString;
        for(let weekChosen in yearChosen) {
            let week = weekChosen;
            week.split('').splice(4,0," ").join('');
            let { start, end, available, pending } = yearChosen[week]
            start = new Date(start);
            start = start.getMonth() + "/" + start.getDate();
            end = new Date(end);
            end = end.getMonth() + "/" + end.getDate();

            weekArray.push({week,year,start,end,available,pending})
        }
        console.log("week array", weekArray)
        return weekArray
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleYearSelect = year => {
        console.log('year select', year)
        this.setState({ chosenYear : year}, ()=>{
            this.getWeeks(this.state.rawCampTimes[year], year)
            this.forceUpdate();
        })
    }
    handleWeekSelect = (week, value) => {
        if(this.state[week] == value) {
            this.setState({[week]: 0}, ()=>this.getCost())
        } 
        else {
            this.setState({[ week ]: value},() => this.getCost());    
        }
        console.log("week select", 'week', week, 'value', value)
    }
    getCost = () => { 
        let weekArray = [this.state.Week1, this.state.Week2, this.state.Week3, this.state.Week4, this.state.Week5, this.state.Week6, this.state.Week7, this.state.Week8];
        console.log("weeks selected", weekArray)
        let firstWeekSelected = 0;
        let totalWeeksSelected = 0;
        for(var i = 0; i<weekArray.length; i++) {
            if(weekArray[i] !== 0) {
                firstWeekSelected= weekArray[i];
                break
            }
        }
        for(var i = 0; i<weekArray.length; i++) {
            if(weekArray[i] !== 0) {
                totalWeeksSelected++;
            }
        }
        let threeDayArray = weekArray.filter(value => value === 3)
        let threeDayCost = 120 * threeDayArray.length
        let fiveDayArray = weekArray.filter(value => value === 5)
        let fiveDayCost = 0;
        let initialCost = 0;
        let fiveDayNumber = fiveDayArray.length
        let savings = 0;
        if(fiveDayNumber>5) {
            fiveDayCost = 135 * fiveDayArray.length;
            initialCost = 135;
            savings = 40 * fiveDayArray.length;
        } else if(fiveDayNumber> 3) {
            fiveDayCost = 150 * fiveDayArray.length;
            initialCost = 150;
            savings = 25 * fiveDayArray.length;
        } else if(fiveDayNumber) {
            fiveDayCost = 175 * fiveDayArray.length;
            initialCost = 175;
        } else if (!fiveDayNumber && totalWeeksSelected) {
            initialCost = 120;
        }
        let totalCost = fiveDayCost + threeDayCost;
        let amountDue = initialCost + (totalWeeksSelected - 1) * 25; 
        this.setState({totalCost, amountDue, savings});
    }
    render() {
        console.log("apply props ", this.props)
        console.log("apply state ", this.state)
        let _props = this.props.location.state;
        return(
            this.props.location.state.isLoadingCalendar?
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                :
                <div>
                    <Helmet>
                        <title>Summer In The Woods</title>
                        <meta name="description" content="Application Page" />
                    </Helmet>
                    <BannerLanding bannerClass="contactBanner" />
                    <div id="main">
                        <div className="inner">
                            <section>
                                <form method="post" action='#'>
                                    <p>To reserve your child’s spot, please submit this completed htmlForm and a deposit of your first week’s payment
                                        plus $25 per additional week. The waiver can be signed once you have visited our location.
                                    </p>
                                    <div className="field half first">
                                        <label htmlFor="childFirstName">Child's First Name</label>
                                        <input type="text" name="childFirstName"></input>
                                    </div>
                                    <div className="field half">
                                        <label htmlFor="childLastName">Child's Last Name</label>
                                        <input type="text" name="childLastName"></input>
                                    </div>
                                    <div className="field half first">
                                        <label htmlFor='age'>Age</label>
                                        <input type="number" name="age"></input>
                                    </div>
                                    <div className="field half">
                                        <label htmlFor="email">Birthdate</label>
                                        <input type="date" name="birthday"></input>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="allergies">Allergies</label>
                                        <textarea name="allergies" rows="6"></textarea>
                                    </div>
                                    <div>
                                        <p>Select the campTimes you would your child to attend.</p>
                                        <br />
                                        <p>Amount Due: ${this.state.amountDue}Total Cost: ${this.state.totalCost}</p>
                                    </div>
                                    <div>
                                        <p>Year</p>
                                        <YearSelect 
                                            yearsArray={_props.yearsArray} 
                                            handleYearSelect={this.handleYearSelect}
                                            chosenYear={this.state.chosenYear}
                                        />
                                        <br />

                                        {this.state.weekArray.map((week,i)=>
                                            <div key = {week.week}>
                                                <p style={{fontSize: "1.5em"}}>{week.week}{"  "}{week.start}-{week.end} Available Spots: {week.available - week.pending}</p>
                                                {(week.available - week.pending)>0?
                                                    <div key={i}>
                                                        <Checkbox
                                                            name={`"${week.week}5"`}
                                                            value="5"
                                                            onChange={()=>this.handleWeekSelect(week.week, 5)}
                                                            checked={this.state[week.week] == "5"}
                                                            value='5'
                                                            onClick={()=> this.handleWeekSelect(week.week, 5)}
                                                            text="5 day"
                                                            
                                                        />
                                                        <Checkbox
                                                            name={`"${week.week}3"`}
                                                            value='5'
                                                            onChange={()=>this.handleWeekSelect(week.week, 5)}
                                                            checked={this.state[week.week] == "3"}
                                                            value='5'
                                                            onClick={()=> this.handleWeekSelect(week.week, 3)}
                                                            text="3 day"
                                                        />
                                                    </div>
                                                    :
                                                    <div key={i}>
                                                        <Checkbox
                                                            labelStyle={{textDecoration: 'line-through'}}
                                                            disabled
                                                            name={`"${week.week}5"`}
                                                            value="5"
                                                            onChange={()=>this.handleWeekSelect(week.week, 5)}
                                                            checked={this.state[week.week] == "5"}
                                                            value='5'
                                                            onClick={()=> this.handleWeekSelect(week.week, 5)}
                                                            text="5 day"
                                                        />
                                                        <Checkbox
                                                            disabled
                                                            labelStyle={{textDecoration: 'line-through'}}
                                                            name={`"${week.week}3"`}
                                                            value='5'
                                                            onChange={()=>this.handleWeekSelect(week.week, 5)}
                                                            checked={this.state[week.week] == "3"}
                                                            value='5'
                                                            onClick={()=> this.handleWeekSelect(week.week, 3)}
                                                            text="3 day"
                                                        />
                                                    </div>
                                                }
                                            </div>                                                
                                        )}
                                    </div>                               
                                </form>
                            </section>
                        </div>
                    </div>
                </div>            
        )        
    }
}

export default Application
