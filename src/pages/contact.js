import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import { Redirect } from "react-router-dom"

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messasge: '',
            email: '',
            name: ''
        }
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        return(
            !this.props.location.state?<Redirect to="/"/>:
                <div>
                    <Helmet>
                        <title>Summer In The Woods</title>
                        <meta name="description" content="Contact Page" />
                    </Helmet>
                    <BannerLanding bannerClass="contactBanner" />
                    <div id="main">
                        <div className="inner">
                            <section>
                                <form method="post" action={process.env.GATSBY_EMAIL_CONTACT_TO}>
                                    <div className="field">
                                        <label htmlFor="name">name</label>
                                        <input type="text" name="name" id="name" value={this.state.name}></input>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email" id="email" value={this.state.email}></input>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="message">Message</label>
                                        <textarea name="message" id="message" rows="6" value={this.state.message}></textarea>
                                    </div>
                                    <ul className="actions">
                                        <li><input type="submit" value="Send Message" className="special" /></li>
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

export default Contact
