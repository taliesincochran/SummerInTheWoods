import React from "react"
const Input = props => {
	return(
		props.required?
			<div className={props.className}>
				<label htmlFor={props.name}>{props.text}</label>
				<input
					type={props.type}
					name={props.name}
					className="form-control"
					placeholder={props.placeholder}
					onChange={props.onChange}
					value={props.value}
					required
				></input>
			</div>
		:props.readonly? 
			<div className={props.className}>
		        <label htmlFor={props.name}>{props.text}</label>
				<input 
					type={props.type} 
					name={props.name} 
					className="form-control"
					placeholder={props.placeholder} 
					onChange={props.onChange} 
					value={props.value}
					readOnly
				></input>
			</div>
		:
			<div className={props.className}>
				<label htmlFor={props.name}>{props.text}</label>
				<input
					type={props.type}
					name={props.name}
					className="form-control"
					placeholder={props.placeholder}
					onChange={props.onChange}
					value={props.value}
				></input>
			</div>	
	)
}
export default Input;