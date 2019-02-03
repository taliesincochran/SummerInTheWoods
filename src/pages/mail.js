import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            location: 'https://summerinthewoodscamp.com'
        }
    }
    componentDidMount() {
        if (window !== undefined) {
            let location = window.location.href;
            let email = location.split("+e=")[1].split("+f=")[0];
            let name = location.split("+n=")[1].split("+e=")[0];
            this.setState({ location, name, email });
        }

    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        let location = typeof this.state.location === 'string' ?
            this.state.location ?
                this.state.location
                :
                'https://summerinthewoodscamp.com/contact'
            :
            'https://summerinthewoodscamp.com/contact';
        return (
            <div>
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Contact Page" />
                </Helmet>
                <BannerLanding bannerClass="contactBanner" />
                <div id="main">
                    <div className="inner">
                        <section>
                            <h2>Your application has been recieved, please submit this form and we will email you the bill.  Thank you for choosing Summer in the woods.</h2> 
                            <form method="post" action={process.env.GATSBY_EMAIL_CONTACT_TO}>
                                <input
                                    type="hidden"
                                    value={`${location.split(0, location.indexOf('/mail'))[0]}`}
                                    name="_redirect"
                                />
                                <div>
                                </div>
                                <div className="field">
                                    <label htmlFor="name">name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        onChange={this.handleChange} 
                                        value={this.state.name}>
                                    </input>
                                </div>
                                <div className="field">
                                    <label htmlFor="email">email</label>
                                    <input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email}></input>
                                </div>
                                <div className="field">
                                    <label htmlFor="message">Additional Information</label>
                                    <textarea name="message" id="message" rows="6" onChange={this.handleChange} value={this.state.message}></textarea>
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
