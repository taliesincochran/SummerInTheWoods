import React, { Component } from 'react';
import Helmet from 'react-helmet';
import '../assets/scss/main.scss';
import Navigation from '../components/Navigation/';
import withAuthentication from '../components/Session/withAuthentication';
import Header from '../components/Header/';
import Footer from '../components/Footer/';
import Menu from '../components/Menu/';
import PropTypes from 'prop-types';
import { Link, withPrefix } from 'gatsby-link';
import { db } from '../firebase';
import { auth } from '../firebase';

// const CLIENT = {
//   sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
//   production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
// };

class TemplateWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuVisible: false,
            loading: 'is-loading',
            auth: null,
            date: '',
            month: '',
            year:'',
            yearsArray: [],
            rawCampTimes: [],
            campTimes: [],
            localTimezoneOffset: 4,
            userAccount: ''
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount () {
        this.timeoutId = setTimeout(() => {
            this.setState({loading: '', });
            this.getCalendar()
        }, 100);
        this.props.location.state?console.log("Welcome back."):auth.doSignOut()
    }
    componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    getCalendar = () => {
        db.getWeeks().then(snapshot => {
            // get current date, month, year
            let dateObject = new Date(); 
            let date = dateObject.getDate();
            let month = dateObject.getMonth();
            let year = dateObject.getFullYear();
            if(month > 6) {
                year += 1;
            }
            // get the timezone of the applicant for security purposes
            let localTimezoneOffset = dateObject.getTimezoneOffset() 
            // data from firebase to be processed into the year or years to be displayed
            let rawCampTimes = snapshot.val();
            let rawYearsArray = Object.keys(rawCampTimes);
            rawYearsArray.sort((a, b) => a - b);
            let yearIndex = 0;
            let chosenYear = year.toString();
            //if the date is already past the last week start date, don't display current year
            if(month > 7 && date > 8) {
                yearIndex = rawYearsArray.indexOf((year + 1).toString());
                chosenYear = (year + 1).toString(); 
            } else {
                yearIndex = rawYearsArray.indexOf(year.toString())
            }
            //Get rid of any data that is outdated
            let yearsArray = rawYearsArray.slice(yearIndex)
            //Make an array of relavent camptimes
            let campTimes = yearsArray.map(year => rawCampTimes[year])
            console.log(';;;;;;;;;;;;;;;;;',campTimes);
            let data = {
                campTimes,
                rawCampTimes,
                date,
                month,
                year,
                localTimezoneOffset,
                yearsArray,
                chosenYear
            }
            //return data to make sure functions are complete before setting the state
            return(data);
        }).then(data=> {
                let { campTimes,
                    rawCampTimes,
                    date,
                    month,
                    year,
                    yearsArray,
                    localTimezoneOffset,
                    chosenYear
                } = data;
            console.log(rawCampTimes);
            this.setState({localTimezoneOffset, rawCampTimes, campTimes, yearsArray, chosenYear, month, year, date});
        })
    }

    handleToggleMenu() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }
    handleChange(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
        this.calculateCost();
    }
    handleYearChange(event) {
        this.setState({ yearChosen: event.target.value });
    }
    calculateCost() {
<<<<<<< HEAD
        let weeksArray = [this.state.week1, this.state.week2, this.state.week3, this.state.week4, this.state.week5, this.state.week6, this.state.week7, this.state.week8, this.state.week9, this.state.week10];
=======
        let weeksArray = [this.state.week0,this.state.week1, this.state.week2, this.state.week3, this.state.week4, this.state.week5, this.state.week6, this.state.week7, this.state.week8,this.week9];
        let threeDayArray = weeksArray.filter(value=> value == 3);
>>>>>>> 825210393fff0a6603155631934f5f486bb9f914
        let fiveDayArray = weeksArray.filter(value=> value == 5);
        let fiveDayCount = fiveDayArray.length() + 1;
        let cost = 0;
        if (fiveDayCount > 3) {
            cost = fiveDayCount * 150;
        } else {
            cost = fiveDayCount * 175;
        }
        this.setState({cost: cost});
    };
    render() {
        const { children } = this.props;
        return (
            <div  className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <Helmet>
                <link rel="stylesheet" href={withPrefix('skel.css')} />
                </Helmet>
                <div id="wrapper">
                    <Header onToggleMenu={this.handleToggleMenu} />
                    {children()}
                    <hr/>
                    <Footer 
                        pathname={this.props.location.pathname} 
                        auth={this.state.auth} 
                        state={this.state}
                        handleChange={this.handleChange} 
                        handleYearChange={this.handleYearChange}
                    />
                </div>
                <Menu onToggleMenu={this.handleToggleMenu}>
                    <Navigation 
                        pathname={this.props.location.pathname} 
                        handleChange={this.handleChange} 
                        handleYearChange={this.handleYearChange} 
                        button={false} 
                        onToggleMenu={this.handleToggleMenu} 
                        auth={this.state.auth} 
                        state={this.state}/>
                </Menu>
            </div>
        );
    }
};
TemplateWrapper.propTypes = {
    children: PropTypes.func
};
export default withAuthentication(TemplateWrapper);
