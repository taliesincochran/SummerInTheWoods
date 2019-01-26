import React from 'react'
import { db } from '../firebase'
import Link from 'gatsby-link'
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import { buttonHashAmountDue, buttonHashFullPrice, email, emailApplicationTo, paymentMethodMessage } from '../constants/variables';

const gotchaStyle = {
    display: 'none'
}

class Mail extends React.Component {
    state={
        totalCost:0,
        name: '',
        totalWeeks:0,
        phone: "",
        email:"",
        address:"",
        childsName: "",
        age: 0
    }
    componentDidMount() {
        let queryString = this.props.location.search.split("?")[1];
        let queryParameters = queryString.split("+");
        queryParameters.forEach(parameter=> {
            let paramName = parameter.split("=")[0];
            let paramValue = parameter.split("=")[1];
            this.setState({[paramName]: [paramValue]});
        });
    }
    "?amountDue=" + this.state.amountDue +
        "+totalCost=" + this.state.totalCost +
        "+name=" + parentName +
        "+totalWeeks=" + this.state.totalWeeksSelected +
        "+phone=" + this.state.parent1Phone +
        "+email=" + email +
        "+address" + this.state.address +
        "+childsName=" + childsName +
        "+age=" + this.state.age + "
    getMessage1 = () => {
        let message = this.state.name + " has submitted an aplication and has elected to pay by mail.  Thier email is " + this.state.email + ". Thier phone number is " + this.state.phoneNumber + ". Thier amount due is " + this.state.amountDue + " . Please send them a bill via email." 
        return message;
    }
    render() {
        let message = this.getMessage();
        if(message) {
            console.log(message);
        }
        return (
                <div>
                    <p>Add any additional information below. Once this form is submitted, we will email you the bill. Thank you for choosing summer in the woods.</p>
                    <div id="main">
                        <div className="inner">
                            <section>
                            <form action="https://liveformhq.com/form/126423ef-549b-46ac-9907-94e13200a101" method="POST" accept-charset="utf-8">
                                    <div className="hide">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" value={this.state.name} />
                                    </div>
                                    <div className="hide">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" className="hide" value={this.state.email} />
                                    </div>
                                    <div className="hide">
                                        <input type="text" name="spam" className="hide" />
                                        <input type="hidden" name="_redirect" value="/" />
                                    </div>
                                    <div className="field" className="hide">
                                        <textarea name="message" id="message" rows="6">{message}</textarea>
                                    </div>
                                    <div className="field" className="hide">
                                        <label htmlFor="additionalInformation">Additional information</label>
                                        <textarea name="additionalInformation" id="additionalInformation" rows="6">{message}</textarea>
                                    </div>
                                    <div></div>
                                    <ul className="actions">
                                        <li><input type="submit" value="Send" className="special" /></li>
                                        <li><input type="reset" value="Clear" /></li>
                                    </ul>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
        )
    }
}



export default Mail;
