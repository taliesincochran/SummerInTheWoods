import React from "react"
const Input = props => {
	return(
		props.required?
			<div className={props.className}>
		        <label htmlFor={props.name}>{props.text}</label>
		        <input type={props.type} name={props.name} required onChange={props.onChange}></input>
		    </div>
		:   
			<div className={props.className}>
		        <label htmlFor={props.name}>{props.text}</label>
		        <input type={props.type} name={props.name} onChange={props.onChange}></input>
		    </div>		
	)
}
export default Input;