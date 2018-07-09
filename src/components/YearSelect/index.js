import React from 'react';
import Checkbox from '../Checkbox'
const YearSelect = props => 
	<div>
	    {props.yearsArray.length > 1?
	        <div>
	            <Checkbox
	                name="year1"
	                value={props.yearsArray[0]}
	                handleWeekSelect={props.handleYearSelect} 
	                isChecked={props.chosenYear == props.yearsArray[0]}
	                className='float-left'
	                value={props.yearsArray[0]}
	                onClick={() => props.handleYearSelect(props.yearsArray[0])}
	                text={props.yearsArray[0]}
	            />
	            <Checkbox 
	                type="checkbox" 
	                name="year2"
	                value={props.yearsArray[1]}
	                onChange={props.handleYearSelect}
	                isChecked={props.chosenYear == props.yearsArray[1]} 
	                className='float-left'
	                value={props.yearsArray[0]}
	                onClickLabel={() => props.handleYearSelect(props.yearsArray[1])} 
	                text={props.yearsArray[1]}
	            />
	        </div>
	    :
	        <div>
	            <Checkbox
	                name="year1"
	                value={props.yearsArray[0]}
	                onChange={props.handleYearSelect} 
	                isChecked={true}
	                className='float-left'
	                value={props.yearsArray[0]}
	                onClickLabel={() => props.handleYearSelect(props.yearsArray[0])}
	                text={props.yearsArray[0]}
	            />
	        </div>
	    }
	</div>
export default YearSelect;
