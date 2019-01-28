import * as React from "react";
import Checkbox from '../Checkbox';

const ApplicationBox = props => {
    let approved = props.approved ? true: false;
    return(
        <li className="infoBox">
            {props.pending?
                <div className='inline'>
                    <Checkbox
                        text="Approve"
                        name={`approve${props.i}`}
                        value={true}
                        style={{ display: "inline-block" }}
                        onClick1={props.onClick1}
                        onChange1={props.onChange1}
                        checked1={props.checked}
                    />
                    <Checkbox
                        text="Reject"
                        name={`reject${props.i}`}
                        value={false}
                        style={{ display: "inline-block" }}
                        onClick={props.onClick2}
                        onChange={props.onChange2}
                        checked2={props.checked}
                    />
                    <h4 className='state inline'>State: Pending</h4>
                </div>
            : 
                <div className="inline">
                    <Checkbox
                        className='inline'
                        text={props.approve?'reject':'approve'}
                        name={props.approved?`reject${props.i}`:`approve${props.i}`}
                        value={false}
                        style={{ display: "inline-block" }}
                        onClick2={props.onClick2}
                        onChange2={props.onChange2}
                    />
                    <h4 className='state inline'>State: {props.approve?'Approved': 'Rejected'}</h4>
                </div>
            }
            <h4 className='name'>{'Child\'s Name:  '}{`${props.firstName} ${props.lastName}`}</h4>
        </li>
    )
}
export default ApplicationBox;