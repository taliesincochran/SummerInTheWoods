import * as React from "react";
import { parseQuery } from '../constants/helper';
import Layout from '../components/layout'
import { Redirect } from "react-router";
import { withFirebase } from '../components/FirebaseContext';

class Mail extends React.Component {
    state={
        totalCost:0,
        amountDue: 0,
        name: '',
        totalWeeks: 0,
        phone: "",
        email:"",
        address:"",
        childsName: "",
        age: 0, 
        
    }
    componentDidMount() {
        if(this.props.location) {
            parseQuery(this.props.location.search, this);
        }
    }
    getMessage = () => {
        let message = this.state.name + " has submitted an aplication and has elected to pay by mail.  Thier email is " + this.state.email + ". Thier phone number is " + this.state.phoneNumber + ". Thier amount due is " + this.state.amountDue + " . Please send them a bill via email." 
        return message;
    }
    render() {
        let message = this.getMessage();
        return (
                <Layout>
                    <p>Add any additional information below. Once this form is submitted, we will email you the bill. Thank you for choosing summer in the woods.</p>
                    <div id="main">
                        <div className="inner">
                            <section>
                            <form action={process.env.GATSBY_EMAIL_CONTACT_TO} method="POST" accept-charset="utf-8">
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
                                    <div className="field hide">
                                        <textarea name="message" id="message" rows="6">{message}</textarea>
                                    </div>
                                    <div className="field hide">
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
                </Layout>
        )
    }
}



export default Mail;
