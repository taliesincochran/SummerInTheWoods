import * as React from "react";

class Mail extends React.Component {
    
    state = {
        additionalInformation: '',
        location: '/'

    }
    componentDidMount () {
        if (window !== undefined) {
            location = window.location;
        } else {
            location = process.env.NODE_ENV === 'production' ? "https://www.summerinthewoodscamp.com/mail" : "https://localhost:8000/mail";
        }
    }
    getRedirect = () => {
        let ref;
        if (this.state.location !== undefined && this.state.location.href !== undefined) {
            ref = this.state.location.href.split('/mail')[0] + '/thankyou';
            return ref;
        } else {
            ref = process.env.NODE_ENV === "production"? "https://www.summerinthewoodscamp/mail": "https://localhost:8000/mail";
        }
    }
    getMessage = () => {
        let message = this.props.location.search.slice((this.props.location.search.indexOf("n=") + 2), this.props.location.search.indexOf("+e")) + " has submitted an aplication and has elected to pay by mail.  Their email is " + this.props.location.search.slice((this.props.location.search.indexOf("e=") + 2), this.props.location.search.indexOf("+f")) + ". Their phone number is " + this.props.location.search.slice(this.props.location.search.indexOf("p=") + 2) + ". Their amount due is " + this.props.location.search.slice((this.props.location.search.indexOf("d=") + 2), this.props.location.search.indexOf("+w")) + "for " + this.props.location.search.slice((this.props.location.search.indexOf("w=") + 2), this.props.location.search.indexOf("+n")) + ". Please send them a bill via email so they can save " + this.props.location.search.slice((this.props.location.search.indexOf("f=") + 2), this.props.location.search.indexOf("+l=")) + " spot.";
        return message;
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        let message = this.getMessage();
        let redirect = this.getRedirect();
        return (
            <div>
                <div id="main">
                    <div className="inner">
                        <h2>Add any additional information below. Once this form is submitted, we will email you the bill. Thank you for choosing summer in the woods.</h2>
                        <section>
                            <form action={process.env.GATSBY_EMAIL_CONTACT_TO} method="POST" accept-charset="utf-8">
                                <div className="hide">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" value={this.props.location.search.slice((this.props.location.search.indexOf("n=") + 2), this.props.location.search.indexOf("+e"))} />
                                </div>
                                <div className="hide">
                                    <input type="text" name="spam" className="hide" />
                                    <input type="hidden" name="_redirect" value={redirect} />
                                </div>
                                <div className="field" className="hide">
                                    <textarea name="message" id="message" rows="6">{message}</textarea>
                                </div>
                                <div className="field">
                                    <label htmlFor="additionalInformation">Additional information</label>
                                    <textarea name="additionalInformation" onChange={this.handleChange} id="additionalInformation" rows="6"></textarea>
                                </div>
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
