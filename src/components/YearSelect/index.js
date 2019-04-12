import * as React from 'react';
import Checkbox from '../Checkbox';

const YearSelect = (props) => {
    console.log("yearSelect", props)
    let { yearsArray, handleYearSelect, chosenYear } = props;
    return(
        <React.Fragment>
            {
                yearsArray.length > 0?(
                    yearsArray.map((year, i) => {
                        return (
                            <Checkbox
                                key={`year${(i+1)}`}
                                name={`year${(i + 1)}`}
                                value={yearsArray[i]}
                                onChange={handleYearSelect}
                                checked={parseInt(chosenYear) === parseInt(yearsArray[i])}
                                className='float-left'
                                onClick={() => handleYearSelect(yearsArray[i])}
                                text={yearsArray[i]}
                            />
                        )
                    })
                ):null
            }
        </React.Fragment>
    )
}
export default YearSelect;