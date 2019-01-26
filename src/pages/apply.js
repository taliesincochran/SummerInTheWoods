import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from "react-router-dom"
// import Moment from 'react-moment'
import { db } from '../firebase'
import Link from 'gatsby-link'
// import BannerLanding from '../components/BannerLanding/'
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Moment from 'moment';
// import LinkItem from '../components/LinkItem';
// import Mail from './mail.js';
import { buttonHashAmountDue, buttonHashFullPrice, email, emailApplicationTo, paymentMethodMessage } from '../constants/variables';

const gotchaStyle = {
    display: 'none'
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            month: '',
            year: '',
            yearsArray: '',
            chosenYear: '',
            numberOfChildren: 1,
            totalCost: 0,
            amountDue: 0,
            campTimezoneOffset: 4,
            localTimezoneOffset: '',
            campTimes: '',
            rawCampTimes: '',
            Week1: false,
            Week2: false,
            Week3: false,
            Week4: false,
            Week5: false,
            Week6: false,
            Week7: false,
            Week8: false,
            Week9: false,
            WeekA: false,
            WeekB: false,
            totalWeeksSelected: 0,
            weekArray: [],
            childFirstName: 'Bob',
            childLastName: 'Man',
            age: 0,
            birthday: '1919-12-12',
            allergies: '',
            parent1Name: 'aoeu',
            parent1Phone: '3333333333',
            parent1Email: 'coeu@oeu.oeu',
            parent1EmailVerify: 'coeu@oeu.oeu',
            parent2Name: 'deou',
            parent2Phone: '4564564566',
            parent2Email: 'fcoeu@oeu.oeu',
            emergency1Name: 'g',
            emergency1Relationship: 'h',
            emergency1Phone: '7894566132',
            emergency2Name: 'i',
            emergency2Relationship: 'j',
            emergency2Phone: '654654654',
            physicianName: 'k',
            physicianPhone: '521123321',
            dentistName: 'l',
            dentistPhone: '6554646456',
            address: 'q',
            option: '',
            firstWeek: 0,
            page: 0,
            buttonHash: '',
            submitted: false,
            message: '',
            redirectString: '',
            paymentMethod: ''
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            console.log(window.location);
            let redirectString = window.location.href.slice(0, (window.location.href.indexOf('/apply') + 1));
            console.log(this.props)
            // console.log(redirectString);
            let { year, month, date, yearsArray, chosenYear, campTimes, rawCampTimes, localTimezoneOffset } = this.props.location.state;
            this.setState({ year, month, date, yearsArray, chosenYear, campTimes, rawCampTimes, localTimezoneOffset, redirectString })
            this.setState({ weekArray: this.getWeeks(this.props.location.state.rawCampTimes[this.props.location.state.chosenYear], this.props.location.state.chosenYear) })
        }
    }

    makeRedirectString = (paymentMethod) => {
        let redirectString = ''
        if(paymentMethod === "paypal") {
            redirectString = this.state.redirectString + "paypal/"
        } else {
            redirectString = this.state.redirectString + "mail/"
        }
        let parentName = this.state.parent1Name.replace(/\s+/g, '');
        let email = this.state.parent1Email.replace(/\s+/g, '');
        let childsName = this.state.childFirstName.replace(/\s+/g, '') + this.state.childLastName.replace(/\s+/g, ''); 
        let address = this.state.address.replace(/\s+/g, '-');
        redirectString = redirectString + 
            "?amountDue=" + this.state.amountDue +
            "+totalCost=" + this.state.totalCost + 
            "+name=" + parentName  +
            "+totalWeeks=" + this.state.totalWeeksSelected + 
            "+phone=" + this.state.parent1Phone +
            "+email=" + email +
            "+address" + this.state.address +
            "+childsName=" + childsName +
            "+age=" + this.state.age + "'"
        console.log(redirectString);
        this.setState({redirectString});
        return redirectString;
    }


    getWeeks = (yearChosen, yearString) => {
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

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleEmail = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handlePaymentMethod = paymentMethod => {
        let redirectString = '';
        if(paymentMethod === "paypal") {
            redirectString = this.makeRedirectString("paypal");
        } else {
            redirectString = this.makeRedirectString("mail");
        }
        this.setState({ redirectString: redirectString, paymentMethod: paymentMethod })
    }

    handleTelephoneNumber = e => {
        let { name, value } = e.target;
        let temp = ''
        let string = value.replace(/[^0-9]+/g, '').toString();
        let firstPart = string.slice(0, 3)
        let secondPart = string.slice(3, 6)
        let thirdPart = string.slice(6, length)
        let length = string.length
        if (length > 0 && length < 4) {
            temp = "(" + string
        } else if (length > 3 && string.length < 7) {
            temp = "(" + firstPart + ")" + secondPart;
        } else if (length > 6) {
            temp = "(" + firstPart + ")" + secondPart + "-" + thirdPart;
            temp = temp.slice(0, 13)
        }
        this.setState({ [name]: temp });
    }

    handleYearSelect = year => {
        this.setState({ chosenYear: year, weekArray: this.getWeeks(this.state.rawCampTimes[year], year), Week0: 0, Week1: 0, Week2: 0, Week3: 0, Week4: 0, Week5: 0, Week6: 0, Week7: 0, Week8: 0, Week9: 0, WeekA: 0, WeekB: 0, firstWeek: 0, totalCost: 0, amountDue: 0 })
    }

    handleSubmit = event => {
        if (this.state.physicianPhone && this.state.physicianName && this.state.dentistPhone && this.state.dentistName) {
            event.preventDefault();
            let { childFirstName, childLastName, age, birthday, allergies, parent1Name, parent1Phone, parent1Email, parent2Name, parent2Phone, parent2Email, emergency1Name, emergency1Relationship, emergency1Phone, emergency2Name, emergency2Relationship, emergency2Phone, physicianName, physicianPhone, dentistName, dentistPhone, address, localTimezoneOffset, chosenYear, Week1, Week2, Week3, Week4, Week5, Week6, Week7, Week8, Week9, WeekA, WeekB, paymentMethod } = this.state;
            age = this.getAge(this.state.birthday);
            const key = chosenYear + "_" + childFirstName + "_" + childLastName + "_" + age;
            const application = { childFirstName, childLastName, age, birthday, allergies, parent1Name, parent1Phone, parent1Email, parent2Name, parent2Phone, parent2Email, emergency1Name, emergency1Relationship, emergency1Phone, emergency2Name, emergency2Relationship, emergency2Phone, physicianName, physicianPhone, dentistName, dentistPhone, address, localTimezoneOffset, chosenYear, Week1, Week2, Week3, Week4, Week5, Week6, Week7, Week8, Week9, WeekA, WeekB, paymentMethod, key }
            db.applicationSubmit(application)
                .then((result) => {
                    this.setState({ submitted: true }, () => {
                        /*=====================================================================================
                        * This is where the page gets set after submission
                        *=====================================================================================*/
                        this.setState({ page: 5 })
                    })
                })
                .catch((err) => {
                })
        } else {
            this.setState({ error4: "Please fill out all required fields." })
        }
    }

    handleNext = event => {
        event.preventDefault();
        window.scrollTo(0, 0);
        switch (event.target.id) {
            case 'previousPage0':
                this.setState({ page: 0 });
                break;
            case 'submitPage0':
                this.state.firstWeek !== -1 ?
                    this.setState({ page: 1, error0: "" }) :
                    this.setState({ error0: "Please select at least one week." });
                break;
            case 'previousPage1':
                this.setState({ page: 1 });
                break;
            case 'submitPage1':
                (this.state.childFirstName && this.state.childLastName && this.state.birthday) ?
                    this.setState({ page: 2, error1: "" }) :
                    this.setState({ error1: "Please fill out all required fields." });
                break;
            case 'previousPage2':
                this.setState({ page: 2 });
                break;
            case 'submitPage2':
                (this.state.parent1Phone && this.state.parent1Name && this.state.address && this.state.parent1Email == this.state.parent1EmailVerify) ?
                    this.setState({ page: 3, error2: '' }) :
                    this.setState({ error2: "Please fill out all required fields and make sure the email fields are filled in properly." });
                break;
            case 'previousPage3':
                this.setState({ page: 3 });
                break;
            case 'submitPage3':
                (this.state.emergency1Name && this.state.emergency2Name && this.state.emergency1Phone && this.state.emergency2Phone && this.state.emergency1Relationship && this.state.emergency2Relationship) ?
                    this.setState({ page: 4, error3: '' }) :
                    this.setState({ error3: "Please fill out all required fields." });
                break;
            case 'submitPage4':
                (this.state.physicianPhone && this.state.physicianName && this.state.dentistPhone && this.state.dentistName) ? 
                    this.setState({ page: 5, error4: '' })
                    :
                    this.setState({ error4: "Please fill out all required fields." })
                break;
            case 'previousPage4':
                this.setState({ page: 4 });
                break;
        }
    }

    handleWeekSelect = (week, value) => {
        if (this.state[week] == value) {
            this.setState({ [week]: 0 }, () => this.getCost())
        }
        else {
            this.setState({ [week]: value }, () => this.getCost());
        }
    }

    makeWeekArray = () => {
        let weekArray = [this.state.Week1, this.state.Week2, this.state.Week3, this.state.Week4, this.state.Week5, this.state.Week6, this.state.Week7, this.state.Week8, this.state.Week9, this.state.WeekA, this.state.WeekB];
        return weekArray
    }

    getAge = (birthdate) => {
        if (parseInt(birthdate.slice(0, 4)) > 1000 && parseInt(birthdate.slice(0, 4)) < Moment().year()) {
            let age = Moment().diff(birthdate, 'years') || 0;
            return age;
        } else {
            return 0;
        }
    }

    getCost = () => {
        let weekArray = this.makeWeekArray()
        let totalWeeksSelected = weekArray.filter(value => value).length;
        console.log('getcost being called', totalWeeksSelected)
        let totalCost = 0;
        let initialCost = 0;
        if (totalWeeksSelected > 3) {
            totalCost = 155 * totalWeeksSelected;
            initialCost = 155;
        } else if (totalWeeksSelected) {
            totalCost = 180 * totalWeeksSelected;
            initialCost = 180;
        } else {
            totalCost = 0;
            initialCost = 0;
        }
        let test = weekArray.filter(value => value === 0);
        let amountDue = 0;
        if (test.length === weekArray.length) {
            amountDue = 0;
        }
        else {
            amountDue = initialCost + (totalWeeksSelected - 1) * 25;
        }
        this.setState({ totalCost, amountDue, totalWeeksSelected });
    }

    render() {
        return (
            !this.props.location.state ? 
            <Redirect to="/" /> 
            :
            (
                <div>
                    <Helmet>
                        <title>Summer In The Woods</title>
                        <meta name="description" content="Application Page" />
                    </Helmet>
                    <div id="main">
                        <div className="inner">
                            <section>
                                <form action={emailApplicationTo} method="POST" acceptCharset="utf-8">
                                
                                    <input 
                                        type="hidden" 
                                        name="_utf8" 
                                        value="✓"
                                    />
                                    <h1>Application</h1>
                                    <div>
                                        <div className={`${this.state.page === 5 ? 'hide' : ''} ${this.state.page === 0 || this.state.page === 5 ? '' : 'displayNone'}`}>
                                            <div>
                                                <p className='errorMessage'>{this.state.error0}</p>
                                                <p>Year {this.props.location.state.yearsArray[0]}</p>
                                                <div className="yearBox">
                                                    <h2>Select the weeks you would your child to attend.</h2>
                                                    {this.props.location.state.yearsArray.length > 1 ?
                                                        <div>
                                                            <Checkbox 
                                                                name="year1" 
                                                                value={this.props.location.state.yearsArray[0]} 
                                                                onChange={this.handleYearSelect} 
                                                                checked={this.state.chosenYear == this.props.location.state.yearsArray[0]} 
                                                                className='float-left' 
                                                                value={this.props.location.state.yearsArray[0]} 
                                                                onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[0])} 
                                                                text={this.props.location.state.yearsArray[0]} 
                                                            />
                                                            <Checkbox 
                                                                type="checkbox" 
                                                                name="year2"
                                                                value={this.props.location.state.yearsArray[1]} 
                                                                onChange={this.handleYearSelect} 
                                                                checked={this.state.chosenYear == this.props.location.state.yearsArray[1]} 
                                                                className='float-left' value={this.props.location.state.yearsArray[0]} 
                                                                onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[1])} 
                                                                text={this.props.location.state.yearsArray[1]} 
                                                            />
                                                        </div>
                                                        :
                                                        <div>
                                                            <Checkbox 
                                                                name="year1" 
                                                                value={this.props.location.state.yearsArray[0]}     
                                                                onChange={this.handleYearSelect} checked={true} 
                                                                className='float-left' 
                                                                value={this.props.location.state.yearsArray[0]} 
                                                                onClick={() => this.handleYearSelect(this.props.location.state.yearsArray[0])} 
                                                                text={this.props.location.state.yearsArray[0]} 
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                                <div className="infoBox">
                                                    {this.state.weekArray.map((week, i) =>
                                                        week.noCamp ?
                                                            <div key={week.week} className='smallBox'>
                                                                <p style={{ fontSize: "1.5em" }}>{week.start}-{week.end}<br /> No Camp This Week</p>
                                                            </div> :
                                                            <div key={week.week} className='smallBox'>
                                                                <p style={week.available - week.pending > 0 ? { fontSize: "1.5em" } : { fontSize: "1.5em", textDecoration: "line-through" }}>{week.start}-{week.end} <br />Spots Available: {week.available - week.pending}</p>
                                                                {(week.available - week.pending) > 0 ?
                                                                    <div key={i}>
                                                                        <Checkbox 
                                                                            name={week.week} 
                                                                            value={true}
                                                                            onChange={() => this.handleWeekSelect(week.week, true)} 
                                                                            checked={this.state[week.week] == true} 
                                                                            onClick={() => this.handleWeekSelect(week.week, true)} 
                                                                            text="Attend this week" 
                                                                        />
                                                                    </div>
                                                                    :
                                                                    <div key={i}>
                                                                        <Checkbox 
                                                                            labelStyle={{ textDecoration: 'line-through' }} 
                                                                            disabled={true} 
                                                                            name={`${week.week}`} 
                                                                            value={true} onChange={() => this.handleWeekSelect(week.week, true)} 
                                                                            checked={false} value={true} 
                                                                            onClick={() => this.handleWeekSelect(week.week, true)} 
                                                                            text="No Camp" 
                                                                        />
                                                                    </div>
                                                                }
                                                            </div>
                                                    )}
                                                </div>
                                                <h2>Total Amount Due To Reserve Selected Weeks: ${this.state.amountDue}</h2>
                                                <h2>Total Cost ${this.state.totalCost}</h2>
                                                <button 
                                                    className="button" 
                                                    id="submitPage0" 
                                                    onClick={this.handleNext}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`${this.state.page === 5 ? 'hide':''} ${this.state.page === 1 || this.state.page === 5?'':'displayNone'}`}>
                                            <h2>Total Amount Due To Reserve Selected Weeks: ${this.state.amountDue}</h2>
                                            <h2>Child's Information</h2>
                                            <p className='errorMessage'>{this.state.error1}</p>
                                            <div className="infoBox">
                                                <Input 
                                                    className="field half first" 
                                                    text="Child's First Name" 
                                                    type="text" 
                                                    name="childFirstName" 
                                                    placeholder="Required" 
                                                    onChange={this.handleChange} 
                                                    value={this.state.childFirstName} 
                                                    required 
                                                />
                                                <Input 
                                                    className="field half" 
                                                    text="Child's Last Name" 
                                                    type="text" 
                                                    name="childLastName" 
                                                    placeholder="Required" 
                                                    onChange={this.handleChange} 
                                                    value={this.state.childLastName}
                                                    required 
                                                />
                                                <Input 
                                                    className="field half" 
                                                    text="Birthdate" 
                                                    type="date" 
                                                    name="birthday" 
                                                    placeholder="Required" 
                                                    onChange={this.handleChange}
                                                    value={this.state.birthday} 
                                                    required 
                                                />
                                                <Input 
                                                    className="field half first" 
                                                    text="Age" 
                                                    type="number" 
                                                    name="age"
                                                    onChange={this.handleChange} 
                                                    value={this.getAge(this.state.birthday)} 
                                                    readOnly={true}
                                                />
                                                <div className="field">
                                                    <label htmlFor="allergies">Allergies</label>
                                                    <textarea 
                                                        name="allergies" 
                                                        rows="6" 
                                                        placeholder="Optional" 
                                                        onChange={this.handleChange} 
                                                        value={this.state.allergies}
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                            <button 
                                                className="button" 
                                                id="previousPage0" 
                                                onClick={this.handleNext}
                                            >
                                                Previous
                                            </button>
                                            <button 
                                                className="button nextPage" 
                                                id="submitPage1" 
                                                onClick={this.handleNext}
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <div className={`${this.state.page === 5 ? 'hide' : ''} ${this.state.page === 2 || this.state.page === 5 ? '' : 'displayNone'}`}>
                                            <h2>Total Amount Due To Reserve Selected Weeks: ${this.state.amountDue}</h2>
                                            <p className='errorMessage'>{this.state.error2}</p>
                                            <h2>Parent Information</h2>
                                            <div className="infoBox">
                                                <div className='smallBox'>
                                                    <p className="formText">Parent 1</p>
                                                    <Input
                                                        className="field half first"
                                                        text="Parent or Guardian's Name"
                                                        type="text"
                                                        name="parent1Name"
                                                        placeholder="Required"
                                                        onChange={this.handleChange}
                                                        value={this.state.parent1Name}
                                                        required
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Parent or Guardian's Phone Number" 
                                                        type="tel" 
                                                        name="parent1Phone" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleTelephoneNumber} 
                                                        value={this.state.parent1Phone} 
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Parent or Guardian's Email" 
                                                        type="email" 
                                                        name="parent1Email" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleEmail} 
                                                        value={this.state.parent1Email}
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Please Re-enter Email" 
                                                        type="email" 
                                                        name="parent1EmailVerify" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleEmail} 
                                                        value={this.state.parent1EmailVerify} 
                                                    />
                                                </div>
                                                <p className="formText">Parent 2</p>
                                                <div className="smallBox">
                                                    <Input 
                                                        className="field half first" 
                                                        text="Parent or Guardian's Name" 
                                                        type="text" 
                                                        name="parent2Name" 
                                                        placeholder="Optional" 
                                                        onChange={this.handleChange} 
                                                        value={this.state.parent2Name}
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Parent or Guardian's Phone Number" 
                                                        type="tel" 
                                                        name="parent2Phone" 
                                                        placeholder="Optional" 
                                                        onChange={this.handleTelephoneNumber} 
                                                        value={this.state.parent2Phone} 
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Parent or Guardian's Email" 
                                                        type="email" 
                                                        name="parent2Email" 
                                                        placeholder="Optional" 
                                                        onChange={this.handleEmail} 
                                                        value={this.state.parent2Email} 
                                                    />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="address">Address</label>
                                                    <textarea name="address" rows="4"
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleChange} 
                                                        value={this.state.address}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div>
                                                <button 
                                                    className="button" 
                                                    id="previousPage1" 
                                                    onClick={this.handleNext}
                                                >
                                                    Previous
                                                </button>
                                                <button 
                                                    className="button nextPage" 
                                                    id="submitPage2" 
                                                    onClick={this.handleNext}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`${this.state.page === 5 ? 'hide' : ''} ${this.state.page === 3 || this.state.page === 5 ? '' : 'displayNone'}`}>
                                            <h2>Total Amount Due To Reserve Selected Weeks: ${this.state.amountDue}</h2>
                                            <p className='errorMessage'>{this.state.error3}</p>
                                            <h2>Emergency Information</h2>
                                            <div className="infoBox">
                                                <div className="smallBox">
                                                    <p className="infoText">List two other contacts who will assume temporary care of your child if you cannot be reached</p>
                                                    <p className="formText">Contact 1</p>
                                                    <Input 
                                                        className="field half first" 
                                                        text="Contact's Name" 
                                                        type="text" 
                                                        name="emergency1Name" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleChange} 
                                                        value={this.state.emergency1Name} 
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Contact's Phone Number" 
                                                        type="tel" 
                                                        name="emergency1Phone" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleTelephoneNumber} 
                                                        value={this.state.emergency1Phone} 
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Contact's Relationship" 
                                                        type="text" 
                                                        name="emergency1Relationship" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleChange} 
                                                        value={this.state.emergency1Relationship} 
                                                    />
                                                </div>
                                                <p className="formText">Contact 2</p>
                                                <div className="smallBox">
                                                    <div style={{ height: '5px' }} />
                                                    <Input 
                                                        className="field half first" 
                                                        text="Contact's Name" 
                                                        type="text" 
                                                        name="emergency2Name"
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleChange} 
                                                        value={this.state.emergency2Name} 
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Contact's Phone Number" 
                                                        type="tel" 
                                                        name="emergency2Phone" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleTelephoneNumber} 
                                                        value={this.state.emergency2Phone} 
                                                    />
                                                    <Input 
                                                        className="field half" 
                                                        text="Contact's Relationship" 
                                                        type="text" 
                                                        name="emergency2Relationship" 
                                                        placeholder="Required" 
                                                        required 
                                                        onChange={this.handleChange} 
                                                        value={this.state.emergency2Relationship} 
                                                    
                                                        />
                                                </div>
                                            </div>
                                            <button 
                                                className="button" 
                                                id="previousPage2" 
                                                onClick={this.handleNext}
                                            >Previous</button>

                                            <button 
                                                className="button nextPage" 
                                                id="submitPage3" 
                                                onClick={this.handleNext}
                                            >Next</button>
                                        </div>
                                        <div className={`${this.state.page === 5 ? 'hide' : ''} ${this.state.page === 4 || this.state.page === 5 ? '' : 'displayNone'}`}>
                                            <h2>Total Amount Due To Reserve Selected Weeks: ${this.state.amountDue}</h2>
                                            <p className='errorMessage'>{this.state.error4}</p>
                                            <h2>Physician and Dentist Information</h2>

                                            <div className="infoBox">

                                                <Input 
                                                    className="field half first" 
                                                    text="Physician's Name" 
                                                    type="text" 
                                                    name="physicianName"
                                                    placeholder="Required" 
                                                    required 
                                                    onChange={this.handleChange} 
                                                    value={this.state.physicianName} 
                                                />

                                                <Input 
                                                    className="field half" 
                                                    text="Physician's Number" 
                                                    type="tel" 
                                                    name="physicianPhone" 
                                                    placeholder="Required" 
                                                    required 
                                                    onChange={this.handleTelephoneNumber} 
                                                    value={this.state.physicianPhone} 
                                                />

                                                <Input 
                                                    className="field half first" 
                                                    text="Dentist's Name" 
                                                    type="text" 
                                                    name="dentistName" 
                                                    placeholder="Required" 
                                                    required 
                                                    onChange={this.handleChange} 
                                                    value={this.state.dentistName} 
                                                />

                                                <Input 
                                                    className="field half" 
                                                    text="Dentists's Number" 
                                                    type="tel"
                                                    name="dentistPhone" 
                                                    placeholder="Required" 
                                                    required 
                                                    onChange={this.handleTelephoneNumber} 
                                                    value={this.state.dentistPhone} 
                                                />

                                            </div>
                                            <button 
                                                className="button" 
                                                id="previousPage3" 
                                                onClick={this.handleNext}
                                            >Previous</button>

                                            <button
                                                className="button nextPage"
                                                id="submitPage4"
                                                onClick={this.handleNext}
                                            >Next</button>
                                        </div>
                                        <div className={this.state.page === 5 ? '' : 'displayNone'}>
                                            <h2>Total Amount Due To Reserve Selected Weeks: ${this.state.amountDue}</h2>
                                            <h3>Total Remaining After Payment: ${this.state.totalCost - this.state.amountDue}</h3>
                                            <h2>{paymentMethodMessage}</h2>
                                            <input
                                                type="hidden"
                                                value={this.state.redirectString}
                                                name="_redirect"
                                            />
                                            <h4>Payment Method</h4>
                                            <Checkbox
                                                name='paypal'
                                                value='paypal'
                                                onChange={() => this.handlePaymentMethod('paypal')}
                                                checked={this.state.paymentMethod === "paypal"}
                                                onClick={() => this.handlePaymentMethod('paypal')}
                                                text="Pay By Paypal"
                                                                />
                                            <Checkbox
                                                name='mail'
                                                value='mail'
                                                onChange={() => this.handlePaymentMethod('mail')}
                                                checked={this.state.paymentMethod === 'mail'}
                                                onClick={() => this.handlePaymentMethod('mail')}
                                                text="Pay By Mail"
                                                />
                                            <button
                                                className="button"
                                                id="previousPage4"
                                                onClick={this.handleNext}
                                            >
                                                Previous
                                            </button>
                                            <button 
                                                type="submit" 
                                            >Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            )
        )
    }
}
    


export default Application;
