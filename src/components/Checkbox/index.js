import * as React from "react";

const Input = props => {
    return(
        <input
            disabled={props.disabled?props.disabled:false}
            type="checkbox"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            checked={props.checked}
        />
    )   
};

const Label = props => {
    return(
        props.disabled?
            <label
                className={props.className}
                htmlFor={props.name}
                style={props.labelStyle}
            >
                {props.text}
            </label>
        :
            <label
                className={props.className}
                htmlFor={props.name}
                value={props.value}
                onClick={props.onClick}
                style={props.labelStyle}
            >
            {props.text}
            </label>
    )
};
const Checkbox = props => {
    return ( 
    <div style={props.style}>
        <Input
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            checked={props.checked}
            labelStyle={props.labelStyle}
        />
        <Label
            className={props.className}
            name={props.name}
            value={props.value}
            onClick={props.onClick}
            labelStyle={props.labelStyle}
            text={props.text}
        >
        {props.text}
        </Label>
    </div>)
};
export default Checkbox;