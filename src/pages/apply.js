import React from 'react'
import Helmet from 'react-helmet'
// import Moment from 'react-moment'
import { db } from '../firebase'
import BannerLanding from '../components/BannerLanding/'
import CampTimes from '../components/CampTimes'

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
            cost: 0,
            // localTimezoneOffset: props.loction.state.localTimezoneOffset,
            campTimezoneOffset: 4,
            localTimezoneOffset: this.props.location.state.localTimezoneOffset,
            campTimes: this.props.location.state.campTimes,
            week1: 0,
            week1Full: false,
            week2: 0,
            week2Full: false,
            week3: 0,
            week3Full: false,
            week4: 0,
            week4Full: false,
            week5: 0,
            week5Full: false,
            week6: 0,
            week6Full: false,
            week7: 0,
            week7Full: false,
            week8: 0,
            week8Full: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleYearSelect = this.handleYearSelect.bind(this)
    }
    componentDidMount() {
        console.log("apply this.props", this.props)
        this.props.location.state.campTimes.map((week, i)=>{
            let full = "week" + (i + 1).toString() + "Full"
            if (week.available - week.pending <= 0) {
                this.setState({ [full]: true})
            }
        })
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleYearSelect = year => {
        console.log('year select', year)
        this.setState({ chosenYear : year});
    }
    handleWeekSelect = (week, value) => {
        console.log('week', week, 'value', value)
        this.setState({[ week ]: value})
    }
    getCost = () => { 
    {/*
        let weekArray = [this.state.Week1, this.state.Week2, this.state.Week3, this.state.Week4, this.state.Week5, this.state.Week6, this.state.Week7, this.state.Week8];
        let threeDayArray = weekArray.filter(value => value==="threeDay")
        let threeDayCost = 120 * threeDayArray.length
        let fiveDayArray = weekArray.filter(value => value==="fiveDay")
        let fiveDayCost = 0;
        if(fiveDayArray.length>5) {
            fiveDayCost = 135 * fiveDayArray.length
        } else if(fiveDayArray.length> 3) {
            fiveDayCost = 150 * fiveDayArray.length
        } else {
            fiveDayCost = 175 * fiveDayArray.length
        }
        let cost = fiveDayCost + threeDayCost;
        this.setState({cost});
        return cost;



*/}
    }
    render() {
        console.log("apply props ", this.props)
        console.log("apply state ", this.state)
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
                                        <p>Total Cost: ${this.state.cost}</p>
                                    </div>
                                    <div className="3u 6u$(small) float-left">
                                        <p>Year</p>
                                        {this.state.yearsArray.length == 2?
                                            <div>
                                                <input 
                                                    type="checkbox"
                                                    name="year1"
                                                    value={this.state.yearsArray[0]}
                                                    onChange={this.handleYearSelect} 
                                                    checked={this.state.chosenYear == this.state.yearsArray[0]}
                                                />            
                                                <label htmlFor="year1" 
                                                    className='float-left'
                                                    value={this.state.yearsArray[0]}
                                                    onClick={() => this.handleYearSelect(this.state.yearsArray[0])}
                                                >
                                                    {this.state.yearsArray[0]}
                                                </label>
                                                <input 
                                                    type="checkbox" 
                                                    name="year2"
                                                    value={this.state.yearsArray[1]}
                                                    checked={this.state.chosenYear == this.state.yearsArray[1]} 
                                                    onClick={this.handleYearSelect}
                                                />            
                                                <label 
                                                    htmlFor="year2" 
                                                    className='float-left'
                                                    value={this.state.yearsArray[0]}
                                                    onClick={() => this.handleYearSelect(this.state.yearsArray[1])} 
                                                >
                                                    {this.state.yearsArray[1]}
                                                </label>
                                            </div>
                                        :
                                        <p>{this.state.yearsArray[0]}</p>}
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
