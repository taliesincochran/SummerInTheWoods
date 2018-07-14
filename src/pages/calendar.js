import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import Selectable from '../components/Selectable'
import { Redirect } from "react-router-dom"
import Checkbox from '../components/Checkbox'
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            views: [],
            views2: [],
            year: '',
            yearsArray: [],
            weekArray: [],
            chosenYear: '',
            rawCampTimes: ''
        }
    }
    componentDidMount () {
        if(this.props.location.state) {                                       
            let {year, yearsArray, chosenYear, rawCampTimes} = this.props.location.state;
            this.setState({year: year, yearsArray: yearsArray, chosenYear:chosenYear, rawCampTimes: rawCampTimes, views: this.getViews(this.props.location.state.chosenYear), views2: this.getViews(parseInt(this.props.location.state.chosenYear) + 1)}, () => console.log("CALENDAR STATE", this.state))      
        }    
    }
    handleYearSelect = year => {
        console.log('year select', year, this.state)
        this.setState({ chosenYear : year, weekArray: this.getWeeks(this.state.rawCampTimes[year], year)})
    }
    getViews = (year) => {
        let months = ["June", "July", "August"];
        let dates = months.map((month, i)=> new Date(year, i + 5, 1))
        let views = [];
        for(var i = 0; i<months.length; i++) {
            let month = months[i];
            let date = dates[i];
            views.push({month, date, i})
        }
        console.log('views', views)
        return views;
    }  
    getWeeks (yearChosen, yearString) {
        console.log("get weeks called", yearString)
        let weekArray = [];
        console.log("yearChosen", yearChosen);
        let year = yearString;
        for(let weekChosen in yearChosen) {
            let week = weekChosen;
            week.split('').splice(4,0," ").join('');
            let { start, end, available, pending, noCamp } = yearChosen[week]
            start = new Date(start);
            start = start.getMonth() + "/" + start.getDate();
            end = new Date(end);
            end = end.getMonth() + "/" + end.getDate();
            weekArray.push({week,year,start,end,available,pending,noCamp})
        }
        console.log("week array", weekArray)
        return weekArray
    }
    render() {
        return(
            !this.props.location.state?<Redirect to="/"/>:
            <div>
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Calendar Page" />
                </Helmet>
                <BannerLanding bannerClass="contactBanner" />
                <div id="main">
                    {this.props.location.state.yearsArray.length > 1?
                        <div>
                            <Checkbox name="year1" value={this.props.location.state.yearsArray[0]} onChange={this.handleYearSelect} checked={this.state.chosenYear == this.props.location.state.yearsArray[0]} className='float-left' value={this.props.location.state.yearsArray[0]} onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[0])} text={this.props.location.state.yearsArray[0]} />
                            <Checkbox type="checkbox" name="year2" value={this.props.location.state.yearsArray[1]} onChange={this.handleYearSelect} checked={this.state.chosenYear == this.props.location.state.yearsArray[1]} className='float-left' value={this.props.location.state.yearsArray[0]} onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[1])} text={this.props.location.state.yearsArray[1]} />
                        </div>
                    :
                        <div>
                            <Checkbox name="year1" value={this.props.location.state.yearsArray[0]} onChange={this.handleYearSelect} checked={true} className='float-left' value={this.props.location.state.yearsArray[0]} onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[0])} text={this.props.location.state.yearsArray[0]} />
                        </div>
                    }
                    <div className="inner">
                        {this.state.views?
                            this.state.chosenYear==this.props.location.state.yearsArray[0]?
                                this.state.views.map((view, i)=>
                                    <Selectable {...this.props} key={i} campTimes={this.props.location.state.campTimes[0]} year={this.props.location.state.yearsArray[0]} index={0} title={view.month} defaultDate={view.date} />                        
                            ):null
                        :null
                        }
                        {this.state.views2?
                            this.state.chosenYear==this.props.location.state.yearsArray[1]?
                                this.state.views2.map((view, i)=>
                                     <Selectable {...this.props} key={i} year={this.props.location.state.yearsArray[1]} campTimes={this.props.location.state.campTimes[1]} index={1} title={view.month} defaultDate={view.date} />  
                                )
                            :null
                        :null
                        }
                    </div>
                </div>
            </div>
        )        
    }
}

export default Calendar
