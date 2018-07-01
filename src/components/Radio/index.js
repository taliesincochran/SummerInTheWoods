import React from 'react'

const Radio = props => {
    console.log('radio props', props.name, "  ", props)
    return(
        <div className="3u 6u$(small) float-left">
            <input 
                type="radio" 
                name={props.name}
                value1={props.value}
                checked={props.selected === props.value1}
                onClick={props.handleChange}
                onChange={props.handleChange} 
            />            
            <label htmlFor={props.name} className='float-left'>
                {props.value1}
            </label>
            <input 
                type="radio" 
                name={props.name}
                value2={props.value}
                checked={props.selected === props.value2}
                onClick={props.handleChange} 
                onChange={props.handleChange}
            />            
            <label htmlFor={props.name} className='float-left'>
                {props.value2}
            </label>
        </div>                                     
    )
}

export default Radio