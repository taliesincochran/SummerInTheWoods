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
            let _props = this.props.location.state                
            let {year, yearsArray, chosenYear, rawCampTimes} = _props;
            this.setState({year: year, yearsArray: yearsArray, chosenYear:chosenYear, rawCampTimes: rawCampTimes, views: this.getViews(_props.chosenYear), views2: this.getViews(parseInt(_props.chosenYear) + 1)}, () => console.log("CALENDAR STATE", this.state))      
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
        let _props= this.props.location.state;
        console.log("i", _props.yearsArray.indexOf(this.state.chosenYear))
        return(
            !_props?<Redirect to="/"/>:
            <div>
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Calendar Page" />
                </Helmet>
                <BannerLanding bannerClass="contactBanner" />
                <div id="main">
                    {_props.yearsArray.length > 1?
                        <div>
                            <Checkbox name="year1" value={_props.yearsArray[0]} onChange={this.handleYearSelect} checked={this.state.chosenYear == _props.yearsArray[0]} className='float-left' value={_props.yearsArray[0]} onClick={() => this.handleYearSelect(_props.yearsArray[0])} text={_props.yearsArray[0]} />
                            <Checkbox type="checkbox" name="year2" value={_props.yearsArray[1]} onChange={this.handleYearSelect} checked={this.state.chosenYear == _props.yearsArray[1]} className='float-left' value={_props.yearsArray[0]} onClick={() => this.handleYearSelect(_props.yearsArray[1])} text={_props.yearsArray[1]} />
                        </div>
                    :
                        <div>
                            <Checkbox name="year1" value={_props.yearsArray[0]} onChange={this.handleYearSelect} checked={true} className='float-left' value={_props.yearsArray[0]} onClick={() => this.handleYearSelect(_props.yearsArray[0])} text={_props.yearsArray[0]} />
                        </div>
                    }
                    <div className="inner">
                        {this.state.views?
                            this.state.chosenYear==_props.yearsArray[0]?
                                this.state.views.map((view, i)=>
                                    <Selectable {...this.props} key={i} campTimes={_props.campTimes[0]} year={_props.yearsArray[0]} index={0} title={view.month} defaultDate={view.date} />                        
                            ):null
                        :null
                        }
                        {this.state.views2?
                            this.state.chosenYear==_props.yearsArray[1]?
                                this.state.views2.map((view, i)=>
                                     <Selectable {...this.props} key={i} year={_props.yearsArray[1]} campTimes={_props.campTimes[1]} index={1} title={view.month} defaultDate={view.date} />  
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
