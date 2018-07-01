import React from 'react'

const Radio = props => {
    <div className="3u 6u$(small) float-left">
        <label>
            <input 
                type="radio" 
                name={props.name}
                onChange={props.handleChange} 
                value={props.value1}
                checked={props.checked == props.value1}
            />            
            {props.value1}
        </label>
        <label>
            <input 
                type="radio"  
                name={props.name}
                onChange={props.handleChange} 
                value={props.value2}
                checked={props.checked == props.value2}
            />  
            {props.value2}
        </label>
    </div>                                     
}
export default Radio