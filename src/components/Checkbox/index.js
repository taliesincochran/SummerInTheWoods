import React from "react"
const Input = props => 
    props.disabled?
        <input
            disabled
            type="checkbox"
            name={props.name}
            value={props.value}
            onChange={props.handleWeekSelect}
            checked={props.isChecked}
        />
        :
        <input
            type="checkbox"
            name={props.name}
            value={props.value}
            onChange={props.handleWeekSelect}
            checked={props.isChecked}
        />

const Checkbox = props => 
    <div style={props.style}>
        <Input
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            isChecked={props.isChecked}
            labelStyle={props.labelStyle}
        />
        <label
            className={props.className}
            htmlFor={props.name}
            value={props.value}
            onClick={props.onClickLabel}
            style={props.labelStyle}
        >
        {props.text}
        </label>
    </div>
export default Checkbox