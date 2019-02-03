import * as React from 'react';
import { paypalMessage } from '../constants/variables';
import { Redirect } from "react-router";


const PaypalButton = props => {
    return (
        <form action={process.env.GATSBY_PAYPAL_ACTION} method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
                type="hidden"
                name="hosted_button_id"
                value={props.hash === '1' ? process.env.GATSBY_PAYPAL_AMOUNTDUE1_BUTTON_HASH : props.hash === '2' ? process.env.GATSBY_PAYPAL_AMOUNTDUE2_BUTTON_HASH : props.hash === '3' ? process.env.GATSBY_PAYPAL_TOTALCOST1_BUTTON_HASH : props.hash === '4' ? process.env.GATSBY_PAYPAL_TOTALCOST2_BUTTON_HASH : 'error'} />
            <table className='hide'>
                <tbody><tr><td><input type="hidden" name="on0" value="Number of Weeks" />Number of Weeks</td></tr><tr><td>
                    <select name="os0">
                        <option
                            value={props.week} defaultValue={props.week}>{`${props.week} $${props.cost}.00 USD`}</option>
                    </select>
                </td></tr></tbody>
            </table>
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src={props.hash ? "https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" : "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png"} border="0" name={props.hash ? "submit" : "error"} alt="PayPal - The safer, easier way to pay online!" />
            <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
    )
}

class Paypal extends React.Component {
    render() {
        return (
            !this.props.location.search?<Redirect to="/"/>:
            <div>
                <p>{paypalMessage}</p>
                <div id="main">
                    <div className="inner">
                        <section>
                                <p>Pay amount due of ${this.props.location.search.slice((this.props.location.search.indexOf("d=") + 2), this.props.location.search.indexOf("+w="))}.00 to reserve {this.props.location.search.slice((this.props.location.search.indexOf("f=") + 2), this.props.location.search.indexOf('+l=')).replace(/_/g, ' ')}'s spot</p>
                            <PaypalButton
                                cost={this.props.location.search.slice((this.props.location.search.indexOf("d=") + 2), this.props.location.search.indexOf("+w="))}
                                week={this.props.location.search.slice((this.props.location.search.indexOf("w=") + 2), this.props.location.search.indexOf("+n="))}
                                hash={this.props.location.search.slice((this.props.location.search.indexOf("a=") + 2), this.props.location.search.indexOf("+c="))} />
                            <p>...or pay the total cost of ${this.props.location.search.slice((this.props.location.search.indexOf("c=") + 2), this.props.location.search.indexOf("+d="))}.</p>
                            <PaypalButton
                                cost={this.props.location.search.slice((this.props.location.search.indexOf("c=") + 2), this.props.location.search.indexOf("+d="))}
                                week={this.props.location.search.slice((this.props.location.search.indexOf("w=") + 2), this.props.location.search.indexOf("+n="))}
                                hash={this.props.location.search.slice((this.props.location.search.indexOf("a=") + 2), this.props.location.search.indexOf("+c="))} />
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}



export default Paypal;
