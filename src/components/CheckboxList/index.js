import * as React from 'react';
import Checkbox from '../Checkbox';
const ListBox = props => {
    const { name, selectionArray, handleSelect, compareVariable, text} = props;
    const labelStyle = props.lableStyle || null;
    <Checkbox
        name={`${key}${(i + 1)}`}
        value={selectionArray[i]}
        onChange={handleSelect}
        checked={compareVariable.toString().toUpperCase() === selectionArray[i].toString().toUpperCase()}
        className='float-left'
        onClick={() => handleSelect(selectionArray[i])}
        text={text}        
    />
}
const BoxHeader = props => {
    const { headerStyle } = props || {};
    const { headerLine1, headerLine2 } = props || '';
    return(
        <div key={week.week} className='smallBox'>
            <p style={headerStyle}>{headerLine1}<br />{headerLine2}</p>
        </div> 
    )

}

const CheckboxList = (props) => {
    console.log(`${name} array list`, props)
    const { name, selectionArray, handleSelect, compareVariable, text, selectValue } = props;
    const header = props.header || false;
    const dynamicName = props.dynamicName || false;
    const arraySelect = props.arraySelect || false;
    const headerLine1 = props.headerLine1 || '';
    const headerLine2 = props.headerLine2 || '';
    return(
        <React.Fragment>
            {
                selectionArray.length > 0?(
                    selectionArray.map((item, i) => (
                        <React.Fragment key={`${name}${i}`}>
                            {
                                header?
                                    (
                                        <BoxHeader
                                            headerLine1={headerLine1}
                                            headerLine2={headerLine2}
                                            headerStyle={headerStyle}
                                        />
                                    )
                                : null
                            }

                            <ListBox
                                name={dynamicName?`${name}${i}`:name}
                                selectionArray={selectionArray}
                                handleSelect={() => handleSelect(selectValue[i])}
                                labelStyle={labelStyle}
                                compareVariable={compareVariable}
                                text={text}
                            />
                        </React.Fragment>
                            
                    ))
                ):null
            }
        </React.Fragment>
    )
}
const CheckBoxListFromStringArray = props => {

}
const CheckBoxListFromObjectArray = props => {

}
export default YearSelect;
