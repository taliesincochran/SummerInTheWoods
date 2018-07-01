import React from 'react'

const FormInput = props => 
	<div className={props.divClass}>
		<label htmlFor={props.htmlFor}>
			{props.labelText}
		</label>
		{props.textArea?
			<textarea 
				name={props.inputName}
				id={props.inputId}
				rows={props.inputRows}
			/>
		:
		<input type={props.inputType}
			name={props.inputName}
			id={props.inputId}
			style={props.inputStyle}
		/>
		}
	</div> 
export default FormInput
