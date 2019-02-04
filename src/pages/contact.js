import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messasge: '',
            email: '',
            name: '',
            location: 'https://summerinthewoodscamp.com'
        }
    }
    componentDidMount () {
        if(window !== undefined) {
            let location = window.location;
            this.setState({location})
        }

    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        let location = typeof this.state.location === 'string'? 
            this.state.location? 
                this.state.location
            : 
                'https://summerinthewoodscamp.com/contact' 
        :   
            'https://summerinthewoodscamp.com/contact';
        return(
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
                                <input
                                    type="hidden"
                                    value={`${location}Recieved`}
                                    name="_redirect"
                                />
                                <div className="field">
                                    <label htmlFor="name">name</label>
                                    <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name}></input>
                                </div>
                                <div className="field">
                                    <label htmlFor="email">email</label>
                                    <input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email}></input>
                                </div>
                                <div className="field">
                                    <label htmlFor="message">Message</label>
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
