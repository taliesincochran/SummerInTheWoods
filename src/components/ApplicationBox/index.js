import * as React from "react";

const ApplicationBox = props => {
    let approved = props.approved ? true: false;
    return(
        <div className="smallBox">
            {props.pending?
                <div className="field">
                    <Checkbox
                        name={`approve${props.i}`}
                        value={true}
                        style={{ display: "inline-block" }}
                        onClick1={props.onClick1}
                        onChange1={props.onChange1}
                    />
                    <Checkbox
                        name={`reject${props.i}`}
                        value={false}
                        style={{ display: "inline-block" }}
                        onClick2={props.onClick2}
                        onChange2={props.onChange2}
                    />
                    <h4>State: Pending</h4>
                </div>
            : 
                <div className="field">
                    <Checkbox
                        name={props.approved?`reject${props.i}`:`approve${props.i}`}
                        value={false}
                        style={{ display: "inline-block" }}
                        onClick2={props.onClick2}
                        onChange2={props.onChange2}
                    />
                    <h4>State: {}</h4>
                </div>
            }
            <h4>{`${props.firstName} ${props.lastName}`}</h4>
        </div>
    )
}
export default ApplicationBox;