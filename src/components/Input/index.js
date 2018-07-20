import React from "react"
const Input = props => {
	return(
		props.required?
			<div className={props.className}>
		        <label htmlFor={props.name}>{props.text}</label>
		        <input type={props.type} name={props.name} placeholder={props.placeholder} required onChange={props.onChange} value={props.value}></input>
		    </div>
		:   
			<div className={props.className}>
		        <label htmlFor={props.name}>{props.text}</label>
		        <input type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.onChange} value={props.value}></input>

		    </div>		
	)
}
export default Input;