export default class Helper {
    constructor (state, props) {
        this.state = state;
        this.props = props;
    }
    getWeekArray = (rawCampTimes, choosenYear, yearString) => {
        let campTimes = rawCampTimes[chosenYear]
        let weekArray = [];
        let year = yearString;
        for (let weekChosen in campTimes) {
            if(campTimes.hasOwnProperty(weekChosen)) {
                let week = weekChosen;
                let { start, end, available, pending, noCamp, approved } = yearChosen[week];
                start = new Date(start);
                start = (parseInt(start.getMonth()) + 1) + "/" + start.getDate();
                end = new Date(end);
                end = (parseInt(end.getMonth()) + 1) + "/" + end.getDate();
                weekArray.push({ week, year, start, end, available, approved, pending, noCamp });
            }
        }
        console.log(weekArray);
        return weekArray;
    };
    /***
     * @params { getValue } func that gets value from database
     * @params { function } setState
     */
    getCalendar(getValue, setState) {
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
            if (month > 7 && date > 8) {
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
            return (data);
        }).then(data => {
            let { campTimes,
                rawCampTimes,
                date,
                month,
                year,
                yearsArray,
                localTimezoneOffset,
                chosenYear
            } = data
            setState({ localTimezoneOffset, rawCampTimes, campTimes, yearsArray, chosenYear, month, year, date });
        })
    }
    validateEmail = email => {
        if (typeof email === "string") {
            let indexOfAt = email.indexOf('@');
            let indexOfDot = email.lastIndexOf('.');
            if (indexOfAt !== -1 && indexOfDot !== -1 && indexOfDot > indexOfAt) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    makeRedirectString = (paymentMethod, window, setState) => {
        let redirectString = '';
        if (this.props.location.pathname !== undefined) {
            redirectString = this.state.location.slice(0, (this.state.location.indexOf('/apply') + 1));
            console.log('pathname base', redirectString, this.props.location, window)
        } else {
            redirectString = 'www.summerinthewoodscamp.com/'
        }
        let name = this.state.parent1Name.replace(/\s+/g, '_');
        let email = this.state.parent1Email.replace(/\s+/g, '_');
        let childFirstName1 = this.state.childFirstName1.replace(/\s+/g, '_');
        let childLastName1 = this.state.childLastName1.replace(/\s+/g, '_');
        let numberOfChildren = this.state.numberOfChildern;
        if (paymentMethod === "paypal") {
            let hash = this.getHash();
            let hash2 = parseInt(hash) + 2;
            redirectString += "paypal/?t=" + (hash === 1 ? 3 : hash === 2 ? 4 : 0) + "+a=" + hash + "+";
        } else {
            redirectString += "mail/?";
        }
        redirectString += "c=" + this.state.totalCost + "+d=" + this.state.amountDue + "+w=" + this.state.totalWeeksSelected + "+n=" + name + "+e=" + email + "+f=" + childFirstName1 + "+l=" + childLastName1 + "+x=" + this.state.numberOfChildren + "+p=" + this.state.parent1Phone;
        setState({ redirectString });
        return redirectString;
    }
    getWeekArray = (yearString) => {
        let yearChosen = this.props.location.state.rawCampTimes[this.props.location.state.chosenYear]
        let weekArray = [];
        let year = yearString;
        for (let weekChosen in yearChosen) {
            let week = weekChosen;
            let { start, end, available, pending, noCamp, approved } = yearChosen[week]
            start = new Date(start);
            start = (parseInt(start.getMonth()) + 1) + "/" + start.getDate();
            end = new Date(end);
            end = (parseInt(end.getMonth()) + 1) + "/" + end.getDate();
            weekArray.push({ week, year, start, end, available, approved, pending, noCamp })
        }
        console.log(weekArray)
        return weekArray
    }
    getHash = () => {
        let hash;
        if (this.state.totalWeeksSelected < 4 && this.state.totalWeeksSelected > 0) {
            hash = 1;
        } else if (this.state.totalWeeksSelected > 3 && this.state.totalWeeksSelected < 14) {
            hash = 2;
        } else {
            hash = 0;
        }
        return hash;
    }
    handlePaymentMethod = paymentMethod => {
        let redirectString;
        if (paymentMethod === "paypal") {
            redirectString = this.makeRedirectString("paypal");
        } else {
            redirectString = this.makeRedirectString("mail");
        }
        this.setState({
            redirectString: redirectString,
            paymentMethod: paymentMethod
        })
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
        let totalWeeksSelected = weekArray.filter(value => value === 1).length;
        let totalCost = 0;
        let initialCost = 0;
        let amountDue = 0;
        let numberOfChildren = this.state.numberOfChildren;
        if (totalWeeksSelected > 3) {
            totalCost = 155 * totalWeeksSelected * numberOfChildren;
            initialCost = 155;
        } else if (totalWeeksSelected) {
            totalCost = 180 * totalWeeksSelected * numberOfChildren;
            initialCost = 180;
        } else {
            totalCost = 0;
            initialCost = 0;
        }
        let test = weekArray.filter(value => value === 0);
        if (test.length === weekArray.length) {
            amountDue = 0;
        }
        else {
            amountDue = (initialCost + (totalWeeksSelected - 1) * 25) * numberOfChildren;
        }
        this.setState({ totalCost, amountDue, initialCost, totalWeeksSelected });
    }
    validateEmail = email => {
        if (typeof email === "string") {
            let indexOfAt = email.indexOf('@');
            let indexOfDot = email.lastIndexOf('.');
            if (indexOfAt !== -1 && indexOfDot !== -1 && indexOfDot > indexOfAt) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    validatePhone = phoneNumber => {
        if (phoneNumber.length === 13) {
            return true
        } else {
            return false
        }
    }
}