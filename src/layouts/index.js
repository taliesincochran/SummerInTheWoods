import React, { Component } from 'react';
import Helmet from 'react-helmet';
import '../assets/scss/main.scss';
import Navigation from '../components/Navigation/';
import Header from '../components/Header/';
import Footer from '../components/Footer/';
import Menu from '../components/Menu/';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby-link';
import { getValue } from '../firebase/db';
import { withAuthorization } from '../components/Session/withAuthorization';



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
            userAccount: '',
            goodBrowser: true
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount () {
        this.timeoutId = setTimeout(() => {
            this.setState({loading: '', });
            this.getCalendar()
        }, 100);
    }
    getCalendar() {
        getValue('campTimes/year').then(rawCampTimes => {
            // get current date, month, year
            let dateObject = new Date(); 
            let date = dateObject.getDate();
            let month = dateObject.getMonth();
            let year = dateObject.getFullYear();
            // get the timezone of the applicant for security purposes
            let localTimezoneOffset = dateObject.getTimezoneOffset() 
            // data from firebase to be processed into the year or years to be displayed
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
                } = data
            this.setState({localTimezoneOffset, rawCampTimes, campTimes, yearsArray, chosenYear, month, year, date});
        })
    }
    componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    handleToggleMenu() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }
    handleChange(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }
    render() {
        const { children } = this.props;
        return (
            <div  className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <Helmet
                    title='Summer in the Woods Camp'
                    meta={[
                        { name: 'description', content: 'A forest school summer camp inspired by Montessori and Reggio Emilia philosophies in Carrboro, NC.  Located close to Chapel Hill, Hillsborough, and Durham in Orange County, North Carolina.'},
                        { name: 'google-site-verification', content: 'zyT7Or4KfDcNlRsIhnybGosmb3rQWHLOTLYiVhtn8R0' },
                        { name: 'siteUrl', content: "https://summerinthewoodscamp.com"},
                    ]}
                >
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
                    />
                </div>
                <Menu onToggleMenu={this.handleToggleMenu}>
                    <Navigation 
                        pathname={this.props.location.pathname} 
                        handleChange={this.handleChange} 
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
export default TemplateWrapper;
