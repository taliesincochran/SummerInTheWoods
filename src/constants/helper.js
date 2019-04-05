// export const getWeekArray = (rawCampTimes, chosenYear, yearString) => {
//     let campTimes = rawCampTimes[chosenYear]
//     let weekArray = [];
//     let year = yearString;
//     for (let weekChosen in campTimes) {
//         if(campTimes.hasOwnProperty(weekChosen)) {
//             let week = weekChosen;
//             let { start, end, available, pending, noCamp, approved } = campTimes[week];
//             start = new Date(start);
//             start = (parseInt(start.getMonth()) + 1) + "/" + start.getDate();
//             end = new Date(end);
//             end = (parseInt(end.getMonth()) + 1) + "/" + end.getDate();
//             weekArray.push({
//                 week,
//                 year,
//                 start,
//                 end,
//                 available,
//                 approved,
//                 pending,
//                 noCamp
//             });
//         }
//     }
//     console.log(weekArray);
//     return weekArray;
// };
// /***
//  * @params { getValue } func that gets value from database
//  * @params { function } that.setState
//  */
// export const getCalendar = (firebase) => {
//     firebase.getValue('campTimes/year').then(rawCampTimes => {
//         // get current date, month, year
//         let dateObject = new Date();
//         let date = dateObject.getDate();
//         let month = dateObject.getMonth();
//         let year = dateObject.getFullYear();
//         // get the timezone of the applicant for security purposes
//         let localTimezoneOffset = dateObject.getTimezoneOffset()
//         // data from firebase to be processed into the year or years to be displayed
//         let rawYearsArray = Object.keys(rawCampTimes);
//         rawYearsArray.sort((a, b) => a - b);
//         let yearIndex = 0;
//         let chosenYear = year.toString();
//         //if the date is already past the last week start date, don't display current year
//         if (month > 7 && date > 8) {
//             yearIndex = rawYearsArray.indexOf((year + 1).toString());
//             chosenYear = (year + 1).toString();
//         } else {
//             yearIndex = rawYearsArray.indexOf(year.toString())
//         }
//         //Get rid of any data that is outdated
//         let yearsArray = rawYearsArray.slice(yearIndex)
//         //Make an array of relavent camptimes
//         let campTimes = yearsArray.map(year => rawCampTimes[year])
//         let data = {
//             campTimes,
//             rawCampTimes,
//             date,
//             month,
//             year,
//             localTimezoneOffset,
//             yearsArray,
//             chosenYear
//         }
//         const promise = new Promise((resolve, reject) => {
//             resolve(data);
//         });
//         //return data to make sure functions are complete before setting the state
//         return promise;
//     })
// }
// export const validateEmail = email => {
//     if (typeof email === "string") {
//         let indexOfAt = email.indexOf('@');
//         let indexOfDot = email.lastIndexOf('.');
//         if (indexOfAt !== -1 && indexOfDot !== -1 && indexOfDot > indexOfAt) {
//             return true
//         } else {
//             return false
//         }
//     } else {
//         return false
//     }
// }
// export const makeRedirectString = (paymentMethod, window, that) => {
//     let redirectString = '';
//     if (that.props.location.pathname !== undefined) {
//         redirectString = that.state.location.slice(0, (that.state.location.indexOf('/apply') + 1));
//         console.log('pathname base', redirectString, that.props.location, window)
//     } else {
//         redirectString = 'https://www.summerinthewoodscamp.com/'
//     }
//     let name = that.state.parent1Name.replace(/\s+/g, '_');
//     let email = that.state.parent1Email.replace(/\s+/g, '_');
//     let childFirstName1 = that.state.childFirstName1.replace(/\s+/g, '_');
//     let childLastName1 = that.state.childLastName1.replace(/\s+/g, '_');
//     // let numberOfChildren = that.state.numberOfChildern;
//     if (paymentMethod === "paypal") {
//         let hash = that.getHash();
//         redirectString += "paypal/?t=" + (hash === 1 ? 3 : hash === 2 ? 4 : 0) + "+a=" + hash + "+";
//     } else {
//         redirectString += "mail/?";
//     }
//     redirectString += "c=" + that.state.totalCost + "+d=" + that.state.amountDue + "+w=" + that.state.totalWeeksSelected + "+n=" + name + "+e=" + email + "+f=" + childFirstName1 + "+l=" + childLastName1 + "+x=" + that.state.numberOfChildren + "+p=" + that.state.parent1Phone;
//     that.setState({ redirectString });
//     return redirectString;
// }

// export const getHash = (that) => {
//     let hash;
//     if (that.state.totalWeeksSelected < 4 && that.state.totalWeeksSelected > 0) {
//         hash = 1;
//     } else if (that.state.totalWeeksSelected > 3 && that.state.totalWeeksSelected < 14) {
//         hash = 2;
//     } else {
//         hash = 0;
//     }
//     return hash;
// }
// export const handlePaymentMethod = (paymentMethod, that) => {
//     let redirectString;
//     if (paymentMethod === "paypal") {
//         redirectString = that.makeRedirectString("paypal");
//     } else {
//         redirectString = that.makeRedirectString("mail");
//     }
//     that.setState({
//         redirectString: redirectString,
//         paymentMethod: paymentMethod
//     })
// }

// export const makeWeekArray = that => {
//     let weekArray = [that.state.Week1, that.state.Week2, that.state.Week3, that.state.Week4, that.state.Week5, that.state.Week6, that.state.Week7, that.state.Week8, that.state.Week9, that.state.WeekA, that.state.WeekB];
//     return weekArray
// }

// export const getAge = (birthdate, Moment) => {
//     if (parseInt(birthdate.slice(0, 4)) > 1000 && parseInt(birthdate.slice(0, 4)) < Moment().year()) {
//         let age = Moment().diff(birthdate, 'years') || 0;
//         return age;
//     } else {
//         return 0;
//     }
// }

// export const getCost = (that) => {
//     let weekArray = getWeekArray(that)
//     let totalWeeksSelected = weekArray.filter(value => value === 1).length;
//     let totalCost = 0;
//     let initialCost = 0;
//     let amountDue = 0;
//     let numberOfChildren = that.state.numberOfChildren;
//     if (totalWeeksSelected > 3) {
//         totalCost = 155 * totalWeeksSelected * numberOfChildren;
//         initialCost = 155;
//     } else if (totalWeeksSelected) {
//         totalCost = 180 * totalWeeksSelected * numberOfChildren;
//         initialCost = 180;
//     } else {
//         totalCost = 0;
//         initialCost = 0;
//     }
//     let test = weekArray.filter(value => value === 0);
//     if (test.length === weekArray.length) {
//         amountDue = 0;
//     }
//     else {
//         amountDue = (initialCost + (totalWeeksSelected - 1) * 25) * numberOfChildren;
//     }
//     const returnObject = {
//         totalCost,
//         amountDue,
//         initialCost,
//         totalWeeksSelected
//     }
//     return returnObject;
// }
// export const validatePhone = phoneNumber => {
//     if (phoneNumber.length === 13) {
//         return true
//     } else {
//         return false
//     }
// }
