import React from 'react';
import Helmet from 'react-helmet';
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
            rawCampTimes: '',
            month: 5
        }
    }
    componentDidMount () {
        if(this.props.location.state) {                                       
            let {year, yearsArray, chosenYear, rawCampTimes} = this.props.location.state;
            this.setState({year: year, yearsArray: yearsArray, chosenYear:chosenYear, rawCampTimes: rawCampTimes, views: this.getViews(this.props.location.state.chosenYear), views2: this.getViews(parseInt(this.props.location.state.chosenYear) + 1)})      

        }    
    }
    handleYearSelect = year => {
        this.setState({ chosenYear : year, weekArray: this.getWeeks(this.state.rawCampTimes[year], year)})
    }
    handleMonthSelect = (month) => {
        this.setState({month})
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
        return views;
    }  
    getWeeks (yearChosen, yearString) {
        let weekArray = [];
        let year = yearString;
        for(let weekChosen in yearChosen) {
            let week = weekChosen;
            let { start, end, available, pending, noCamp } = yearChosen[week]
            start = new Date(start);
            start = start.getMonth() + "/" + start.getDate();
            end = new Date(end);
            end = end.getMonth() + "/" + end.getDate();
            weekArray.push({week,year,start,end,available,pending,noCamp})
        }
        return weekArray
    }
    render() {
        return(

            !(this.props.location.state && this.props.location.state.campTimes.length > 0)?<Redirect to="/"/>:
            <div>
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Calendar Page" />
                </Helmet>
                <div id="main">
                    {this.props.location.state.yearsArray.length > 1?
                        <div>
                            <Checkbox style={{display: "inline-block"}} name="year1" value={this.props.location.state.yearsArray[0]} onChange={this.handleYearSelect} checked={this.state.chosenYear == this.props.location.state.yearsArray[0]} className='float-left' value={this.props.location.state.yearsArray[0]} onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[0])} text={this.props.location.state.yearsArray[0]} />
                            <Checkbox style={{display: "inline-block"}} name="year2" value={this.props.location.state.yearsArray[1]} onChange={this.handleYearSelect} checked={this.state.chosenYear == this.props.location.state.yearsArray[1]} className='float-left' value={this.props.location.state.yearsArray[0]} onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[1])} text={this.props.location.state.yearsArray[1]} />
                        </div>
                    :
                        <div>
                            <Checkbox 
                                style={{display: "inline-block"}} 
                                name="year1" 
                                value={this.props.location.state.yearsArray[0]} 
                                onChange={this.handleYearSelect} 
                                checked={true} 
                                className='float-left' 
                                value={this.props.location.state.yearsArray[0]} 
                                onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[0])} 
                                text={this.props.location.state.yearsArray[0]} 
                            />
                        </div>
                    }
                    <div>
                        <Checkbox 
                            name="June" 
                            value={5} 
                            onChange={()=> this.handleMonthSelect(5)} 
                            checked={this.state.month == 5} 
                            style={{display: "inline-block"}} 
                            value={5} 
                            onClick={() => this.handleMonthSelect(5)} 
                            text="June"
                        />
                        
                        <Checkbox 
                            name="July" 
                            value={6} 
                            onChange={()=> this.handleMonthSelect(6)} 
                            checked={this.state.month == 6} 
                            style={{display: "inline-block"}} 
                            value={6} 
                            onClick={() => this.handleMonthSelect(6)} 
                            text="July"
                        />
                        <Checkbox 
                            name="August" 
                            value={7} 
                            onChange={()=> this.handleMonthSelect(7)} 
                            checked={this.state.month == 7} 
                            style={{display: "inline-block"}} 
                            value={7} 
                            onClick={() => this.handleMonthSelect(7)} 
                            text="August"
                        />
                    </div>
                    <div className="inner">
                        {this.state.views?
                            this.state.chosenYear==this.props.location.state.yearsArray[0]?
                                this.state.views.map((view, i)=>
                                    this.state.month == i + 5?
                                        <Selectable {...this.props} key={i} campTimes={this.props.location.state.campTimes[0]} year={this.props.location.state.yearsArray[0]} index={0} title={view.month} defaultDate={view.date} />                        
                                    :null
                            ):null
                        :null
                        }
                        {this.state.views2?
                            this.state.chosenYear==this.props.location.state.yearsArray[1]?
                                this.state.views2.map((view, i)=>
                                    this.state.month == i + 5?
                                        <Selectable {...this.props} key={i} year={this.props.location.state.yearsArray[1]} campTimes={this.props.location.state.campTimes[1]} index={1} title={view.month} defaultDate={view.date} />  
                                    :null
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
