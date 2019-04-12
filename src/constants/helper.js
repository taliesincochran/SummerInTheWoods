// export const getStateFromFirebase = (props, state, setState) => {
//   let data = props.firebase.state.data;
//   let functions = props.firebase.state.firebase;
//   let { campTimes, rawCampTimes, weekArray, yearChosen, localTimezoneOffset, views, views2 } = data;
//   setState({ campTimes, rawCampTimes, weekArray, yearChosen, localTimezoneOffset, views, views2 }, () => {
//     console.log('apply mounted with firebase', state);
//   });
// }
// export const getHash = (state) => {
//   let hash;
//   if (state.totalWeeksSelected < 4 && state.totalWeeksSelected > 0) {
//     hash = 1;
//   } else if (state.totalWeeksSelected > 3 && state.totalWeeksSelected < 14) {
//     hash = 2;
//   } else {
//     hash = 0;
//   }
//   return hash;
// }
// export const makeRedirectString = (paymentMethod, props, state) => {
//   let redirectString = '';
//   if (props.location.pathname !== undefined) {
//     redirectString = props.location.pathname.slice(0, (props.location.pathname.indexOf('/apply') + 1));
//     console.log('pathname base', redirectString, props.location)
//   } else {
//     redirectString = 'www.summerinthewoodscamp.com/'
//   }
//   let name = state.parent1Name.replace(/\s+/g, '_');
//   let email = state.parent1Email.replace(/\s+/g, '_');
//   let childFirstName1 = state.childFirstName1.replace(/\s+/g, '_');
//   let childLastName1 = state.childLastName1.replace(/\s+/g, '_');
//   // let numberOfChildren = state.numberOfChildern;
//   if (paymentMethod === "paypal") {
//     let hash = this.getHash();
//     redirectString += "paypal/?t=" + (hash === 1 ? 3 : hash === 2 ? 4 : 0) + "+a=" + hash + "+";
//   } else {
//     redirectString += "mail/?";
//   }
//   redirectString += "c=" + state.totalCost + "+d=" + state.amountDue + "+w=" + state.totalWeeksSelected + "+n=" + name + "+e=" + email + "+f=" + childFirstName1 + "+l=" + childLastName1 + "+x=" + state.numberOfChildren + "+p=" + state.parent1Phone;
// //   this.setState({ redirectString });
//   return redirectString;
// }
// export const getWeekArray = (rawCampTimes, yearString) => {
//   let yearChosen = '';
//   yearChosen = rawCampTimes[yearString]
//   let weekArray = [];
//   let year = yearString;
//   for (let weekChosen in yearChosen) {
//     let week = weekChosen;
//     let { start, end, available, pending, noCamp, approved } = yearChosen[week]
//     start = new Date(start);
//     start = (parseInt(start.getMonth()) + 1) + "/" + start.getDate();
//     end = new Date(end);
//     end = (parseInt(end.getMonth()) + 1) + "/" + end.getDate();
//     weekArray.push({ week, year, start, end, available, approved, pending, noCamp })
//   }
//   console.log('weekArray', weekArray)
//   return weekArray
// }
// export const handlePaymentMethod = paymentMethod => {
//   let redirectString;
//   if (paymentMethod === "paypal") {
//     redirectString = this.makeRedirectString("paypal");
//   } else {
//     redirectString = this.makeRedirectString("mail");
//   }
//   this.setState({
//     redirectString: redirectString,
//     paymentMethod: paymentMethod
//   })
// }
// export const handleTelephoneNumber = e => {
//   let { name, value } = e.target;
//   let temp = '';
//   let string = value.replace(/[^0-9]+/g, '').toString();
//   let firstPart = string.slice(0, 3);
//   let secondPart = string.slice(3, 6);
//   let length = string.length;
//   let thirdPart = string.slice(6, length)
//   if (length > 0 && length < 4) {
//     temp = "(" + string
//   } else if (length > 3 && string.length < 7) {
//     temp = "(" + firstPart + ")" + secondPart;
//   } else if (length > 6) {
//     temp = "(" + firstPart + ")" + secondPart + "-" + thirdPart;
//     temp = temp.slice(0, 13)
//   }
//   this.setState({ [name]: temp });
// }
// export const handleYearSelect = year => {
//   this.setState({ chosenYear: year, weekArray: this.getWeekArray(props.firebase.state.data.rawCampTimes[year], year), Week0: 0, Week1: 0, Week2: 0, Week3: 0, Week4: 0, Week5: 0, Week6: 0, Week7: 0, Week8: 0, Week9: 0, WeekA: 0, WeekB: 0, firstWeek: 0, totalCost: 0, amountDue: 0 })
// }
// export const handleApplicationSubmit = event => {
//   event.preventDefault();
//   if (state.physicianPhone && state.physicianName && state.dentistPhone && state.dentistName && props.location.pathname !== undefined) {
//     let {
//       numberOfChildren,
//       childFirstName1,
//       childLastName1,
//       age1,
//       birthday1,
//       allergies1,
//       childFirstName2,
//       childLastName2,
//       age2,
//       birthday2,
//       allergies2,
//       childFirstName3,
//       childLastName3,
//       age3,
//       birthday3,
//       allergies3,
//       childFirstName4,
//       childLastName4,
//       age4,
//       birthday4,
//       allergies4,
//       parent1Name,
//       parent1Phone,
//       parent1Email,
//       parent2Name,
//       parent2Phone,
//       parent2Email,
//       emergency1Name,
//       emergency1Relationship,
//       emergency1Phone,
//       emergency2Name,
//       emergency2Relationship,
//       emergency2Phone,
//       physicianName,
//       physicianPhone,
//       dentistName,
//       dentistPhone,
//       address,
//       localTimezoneOffset,
//       chosenYear,
//       Week1,
//       Week2,
//       Week3,
//       Week4,
//       Week5,
//       Week6,
//       Week7,
//       Week8,
//       Week9,
//       WeekA,
//       WeekB,
//       paymentMethod,
//       other,
//       website
//     } = state;
//     const key = chosenYear + "_" + childFirstName1 + "_" + childLastName1 + "_" + age1;
//     const application = {
//       numberOfChildren,
//       childFirstName1,
//       childLastName1,
//       age1,
//       birthday1,
//       allergies1,
//       childFirstName2,
//       childLastName2,
//       age2,
//       birthday2,
//       allergies2,
//       childFirstName3,
//       childLastName3,
//       age3,
//       birthday3,
//       allergies3,
//       childFirstName4,
//       childLastName4,
//       age4,
//       birthday4,
//       allergies4,
//       parent1Name,
//       parent1Phone,
//       parent1Email,
//       parent2Name,
//       parent2Phone,
//       parent2Email,
//       emergency1Name,
//       emergency1Relationship,
//       emergency1Phone,
//       emergency2Name,
//       emergency2Relationship,
//       emergency2Phone,
//       physicianName,
//       physicianPhone,
//       dentistName,
//       dentistPhone,
//       address,
//       localTimezoneOffset,
//       chosenYear,
//       Week1,
//       Week2,
//       Week3,
//       Week4,
//       Week5,
//       Week6,
//       Week7,
//       Week8,
//       Week9,
//       WeekA,
//       WeekB,
//       paymentMethod,
//       key,
//       other,
//       website
//     }
//     let weeksAttending = [];
//     props.firebase.state.firebase.getValue('test').then(test => {
//       for (let item in application) {
//         if (item.slice(0, 4) === "Week" && application[item] !== 0) {
//           weeksAttending.push(item);
//         }
//       }
//       return weeksAttending;
//     }).then(weeks => {
//       props.firebase.state.firebase.changeTargetChild('applications', key, application)
//         .then(() => {
//           weeks.forEach(week => {
//             let pendingPath = `campTimes/year/${chosenYear}/${week}/pending`;
//             let pendingRef = props.firebase.state.firebase.getRef(pendingPath);
//             props.firebase.state.firebase.getValue(pendingRef).then(pending => {
//               pending = parseInt(pending);
//               props.firebase.state.firebase.changeTarget(`campTimes/year/${key.slice(0, 4)}/${week}/pending`, parseInt(pending) + parseInt(state.numberOfChildren));
//               this.setState({ submitted: true, page: 5 });
//             })
//           })
//         })
//     }
//     )
//   } else {
//     this.setState({ error4: "Please fill out all required fields." })
//   }
// }
// export const handleNext = event => {
//   event.preventDefault();
//   if (typeof window !== undefined) {
//     window.scrollTo(0, 0);
//   }
//   switch (event.target.id) {
//     case 'previousPage0':
//       this.setState({ page: 0 });
//       break;
//     case 'submitPage0':
//       state.amountDue > 0 ?
//         this.setState({ page: 1, error0: "" }) :
//         this.setState({ error0: "Please select at least one week." });
//       break;
//     case 'previousPage1':
//       this.setState({ page: 1, error0: '' });
//       break;
//     case 'submitPage1':
//       (state.childFirstName1 && state.childLastName1 && state.birthday1) ?
//         this.setState({ page: 2, error1: "" }) :
//         this.setState({ error1: "Please fill out all required fields." });
//       break;
//     case 'previousPage2':
//       this.setState({ page: 2, error1: '' });
//       break;
//     case 'submitPage2':
//       (state.parent1Phone && state.parent1Name && state.address && state.parent1Email === state.parent1EmailVerify && this. Email(state.parent1Email) && this.validatePhone(state.parent1Phone)) ?
//         this.setState({ page: 3, error2: '' })
//         :
//         console.log(!!state.parent1Phone, !!state.parent1Name, !!state.address, state.parent1Email === state.parent1EmailVerify, this.validateEmail(state.parent1Email), this.validatePhone(state.parent1Phone));
//       this.setState({ error2: "Please fill out all required fields and make sure the email fields are filled in properly.  Emails must be in the format abc@domain.xyc" });
//       break;
//     case 'previousPage3':
//       this.setState({ page: 3, error2: '' });
//       break;
//     case 'submitPage3':
//       (state.emergency1Name && state.emergency2Name && state.emergency1Phone && state.emergency2Phone && state.emergency1Relationship && state.emergency2Relationship && this.validatePhone(state.emergency1Phone) && this.validatePhone(state.emergency2Phone)) ?
//         this.setState({ page: 4, error3: '' }) :
//         this.setState({ error3: "Please fill out all required fields. Phone numbers must be 10 digits" });
//       break;
//     case 'submitPage4':
//       (state.physicianPhone && state.physicianName && state.dentistPhone && state.dentistName && this.validatePhone(state.dentistPhone) && this.validatePhone(state.physicianPhone)) ?
//         this.setState({ page: 5, error4: '' })
//         :
//         this.setState({ error4: "Please fill out all required fields." })
//       break;
//     case 'previousPage4':
//       this.setState({ page: 4, error3: '' });
//       break;
//   }
// }
// export const handleWeekSelect = (week, value) => {
//   if (state[week] === 1) {
//     this.setState({ [week]: 0 }, () => this.getCost());
//   } else {
//     if (state[week] === 0) {
//       this.setState({ [week]: 1 }, () => this.getCost());
//     }
//   }
// }
// export const makeWeekArray = (state) => {
//   let weekArray = [state.Week1, state.Week2, state.Week3, state.Week4, state.Week5, state.Week6, state.Week7, state.Week8, state.Week9, state.WeekA, state.WeekB];
//   return weekArray
// }
// export const getAge = (birthdate) => {
//   if (parseInt(birthdate.slice(0, 4)) > 1000 && parseInt(birthdate.slice(0, 4)) < Moment().year()) {
//     let age = Moment().diff(birthdate, 'years') || 0;
//     return age;
//   } else {
//     return 0;
//   }
// }
// export const getCost = (state) => {
//   let weekArray = makeWeekArray()
//   let totalWeeksSelected = weekArray.filter(value => value === 1).length;
//   let totalCost = 0;
//   let initialCost = 0;
//   let amountDue = 0;
//   let numberOfChildren = state.numberOfChildren;
//   if (totalWeeksSelected > 3) {
//     totalCost = 155 * totalWeeksSelected * numberOfChildren;
//     initialCost = 155;
//   } else if (totalWeeksSelected) {
//     totalCost = 180 * totalWeeksSelected * numberOfChildren;
//     initialCost = 180;
//   } else {
//     totalCost = 0;
//     initialCost = 0;
//   }
//   let test = weekArray.filter(value => value === 0);
//   if (test.length === weekArray.length) {
//     amountDue = 0;
//   }
//   else {
//     amountDue = (initialCost + (totalWeeksSelected - 1) * 25) * numberOfChildren;
//   }
//   this.setState({ totalCost, amountDue, initialCost, totalWeeksSelected });
// }
// export const validateEmail = email => {
//   if (typeof email === "string") {
//     let indexOfAt = email.indexOf('@');
//     let indexOfDot = email.lastIndexOf('.');
//     if (indexOfAt !== -1 && indexOfDot !== -1 && indexOfDot > indexOfAt) {
//       return true
//     } else {
//       return false
//     }
//   } else {
//     return false
//   }
// }
// export const validatePhone = phoneNumber => {
//   if (phoneNumber.length === 13) {
//     return true
//   } else {
//     return false
//   }
// }