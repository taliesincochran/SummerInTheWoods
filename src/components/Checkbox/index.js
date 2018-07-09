import React from "react"
const Input = props => 
    props.disabled?
        <input
            disabled
            type="checkbox"
            name={props.name}
            value={props.value}
            onChange={props.handleWeekSelect}
            checked={props.checked}
        />
        :
        <input
            type="checkbox"
            name={props.name}
            value={props.value}
            onChange={props.handleWeekSelect}
            checked={props.checked}
        />

const Checkbox = props => 
    <div style={props.style}>
        <Input
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            checked={props.checked}
            labelStyle={props.labelStyle}
        />
        <label
            className={props.className}
            htmlFor={props.name}
            value={props.value}
            onClick={props.onClick}
            style={props.labelStyle}
        >
        {props.text}
        </label>
    </div>
export default Checkbox