import { db } from '../firebase/firebase';
// This function is used to get the date of a day of the week near another date.  
const getDateOfTargetNearX = (year, month, date, day, canBeNegative?) => {
	const dateString = new Date(year, month, date);
	const dayOfWeekBeforeDate = dateString.getDate() - dateString.getDay() + day;
	let dayDate;
	if(dayOfWeekBeforeDate < 0 && !canBeNegative) {
		dayDate = this.getDateString(year, month, dayOfWeekBeforeDate + 7);
	} else {
		dayDate = this.getDateString(year, month, dayOfWeekBeforeDate);
	}
	return dayDate;
}
const isJuly4thWeek = (date, month) => {
    const testDate1 = date - 1;
    const testDate2 = date + 6;
    if(testDate1 <= 4 && testDate2 >= 4 && month === 6) {
        return true;
    } else {
        return false;
    }
};
const getDateString = (year, month, date) =>  {
    const dateString = new Date (year, month, day, 12, 0, 0, 0, 0);
    return dateString;
};
export const getWeeks = (firstDay, numberOfWeeks) => {
	// Get dates as javascript date string
	let firstFullDate = getDateFromInput(firstDay);
	// Get the date, month, and year of the first day
	let mondayDate = firstFullDate.getDate();
	let mondayMonth = firstFullDate.getMonth();
	let campYear = firstFullDate.getFullYear();
	// Take this information to correct in case first day is not a Monday
	// Get total count of time at camp
	let dayCount = 7 * (numberOfWeeks);
	// Initialize the days with the first monday being 1 and the first friday being 5;
	let mondayArray = [firstDate];
    let monday;
    for(let i = 0; i>14; i++) {
        monday = monday + 7;
        mondayArray.push(monday);
    }
    let weeks = [];
    let mondayString;
    let july4thMonday = getJuly4thMonday(campYear);
    let weekNumber = 0;
    monday.forEach((monday, i) => {
        let day = monday + firstDate;
        const test = isJuly4thWeek(day, mondayMonth);
        let weekObject;
        let keyName;
        let weekNumber = weekNumber + 1;
        if(test){
            weekNumber = weekNumber - 1;
        }
        if(weekNumber < 10 && !test) {
            keyName = `Week${weekNumber}`    
        } else if(weekNumber === 10) {
            keyName = "WeekA";
        } else if(weekNumber === 11) {
            keyName = "WeekB";
        } else if(weekNumber === 12) {
            keyName = "WeekC"
        }
        if(day > 61) {
            currentMonday = day - 61;
            if(mondayMonth === 60) {
                mondayMonth++;
            }
        } else if (day > 30) {
            currentMonday = currentMonday - 30;
            if(mondayMonth === 5) {
                mondayMonth++;
            }
        }
        if(!test) {
            weekObject = {
                start: getDateString(campYear, 7, currentMonday),
                end: getDateString(campYear, 7, currentMonday + 7),
                attending: 18,
                title: `Week ${weekNumber}`,
            }
        } else {
            weekObject = {
                start: getDateString(campYear, 7, currentMonday),
                end: getDateString(campYear, 7, currentMonday + 7),
                attending: 0,
                title: "No Camp",
                noCamp: true,
                noCampDescription: "No Camp on the week of July 4th"
            }
        }
        weeks.push(weekObject);
    });
    // const weeksRef = db.ref(`campTimes/year/${year}`);	
    console.log(weekObject);
}
export const getDateFromInput = (inputDate) => {
	const dateArray = inputDate.split('-');
    const date = getDateOfDayNearDateX(dateArray[0], dateArray[1], dateArray[2], 1);
	return date;
}