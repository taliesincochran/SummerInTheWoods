import * as React from 'react';
import { paypalMessage } from '../constants/variables';
// import { Redirect } from "react-router";


const PaypalButton = props => {
    return (
        <form action={process.env.GATSBY_PAYPAL_ACTION} method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
                type="hidden"
                name="hosted_button_id"
                value={
                    (props.hash === '1' && props.numberOfChildren === '1' ) ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE1_BUTTON_HASH
                    :
                    (props.hash === '2' && props.numberOfChildren === '1') ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE2_BUTTON_HASH
                    :
                    (props.hash === '3' && props.numberOfChildren === '1') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST1_BUTTON_HASH
                    :
                    (props.hash === '4' && props.numberOfChildren === '1') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST2_BUTTON_HASH
                    :
                    (props.hash === '1' && props.numberOfChildren === '2') ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE1_2Children_BUTTON_HASH
                    :
                    (props.hash === '2' && props.numberOfChildren === '2') ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE2_2Children_BUTTON_HASH
                    :
                    (props.hash === '3' && props.numberOfChildren === '2') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST1_2Children_BUTTON_HASH
                    :
                    (props.hash === '4' && props.numberOfChildren === '2') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST2_2Children_BUTTON_HASH
                    :
                    (props.hash === '1' && props.numberOfChildren === '3') ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE1_3Children_BUTTON_HASH
                    :
                    (props.hash === '2' && props.numberOfChildren === '3') ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE2_3Children_BUTTON_HASH
                    :
                    (props.hash === '3' && props.numberOfChildren === '3') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST1_3Children_BUTTON_HASH
                    :
                    (props.hash === '4' && props.numberOfChildren === '3') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST2_3Children_BUTTON_HASH
                    :
                    (props.hash === '1' && props.numberOfChildren === '4') ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE1_4Children_BUTTON_HASH
                    :
                    (props.hash === '2' && props.numberOfChildren === '4') ?
                        process.env.GATSBY_PAYPAL_AMOUNTDUE2_4Children_BUTTON_HASH
                    :
                    (props.hash === '3' && props.numberOfChildren === '4') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST1_4Children_BUTTON_HASH
                    :
                    (props.hash === '4' && props.numberOfChildren === '4') ?
                        process.env.GATSBY_PAYPAL_TOTALCOST2_4Children_BUTTON_HASH
                    : 'error'} />
            <table className='hide'>
                <tbody><tr><td><input type="hidden" name="on0" value="Number of Weeks" />Number of Weeks</td></tr><tr><td>
                    <select name="os0">
                        <option
                            value={props.week} defaultValue={props.week}>{`${props.week} $${props.cost}.00 USD`}</option>
                    </select>
                </td></tr></tbody>
            </table>
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src={process.env.GATSBY_PAYPAL_IMAGE_2} alt="PayPal - The safer, easier way to pay online!" />
            <img alt="" border="0" src={process.env.GATSBY_PAYPAL_IMAGE_1} width="1" height="1" />
        </form>
    )
}

class Paypal extends React.Component {
    render() {
        return (
            // !this.props.location.search?<Redirect to="/"/>:
            <div>
                <div id="main">
                    <div className="inner">
                        <p>{paypalMessage}</p>
                        {(this.props.location && this.props.location.search)?
                            <section>
                                    <p>Pay amount due of ${this.props.location.search.slice((this.props.location.search.indexOf("d=") + 2), this.props.location.search.indexOf("+w="))}.00 to reserve your {this.props.location.search.slice((this.props.location.search.indexOf('x=') + 2), this.props.location.search.indexOf("+p=")) === '1'?"child\'s space at camp.":"children\'s spaces at camp."}</p>
                                <PaypalButton
                                    cost={this.props.location.search.slice((this.props.location.search.indexOf("d=") + 2), this.props.location.search.indexOf("+w="))}
                                    week={this.props.location.search.slice((this.props.location.search.indexOf("w=") + 2), this.props.location.search.indexOf("+n="))}
                                    hash={this.props.location.search.slice((this.props.location.search.indexOf("a=") + 2), this.props.location.search.indexOf("+c="))} 
                                    numberOfChildren={this.props.location.search.slice((this.props.location.search.indexOf('x=') + 2), this.props.location.search.indexOf("+p="))} 
                                />
                                <p>...or pay the total cost of ${this.props.location.search.slice((this.props.location.search.indexOf("c=") + 2), this.props.location.search.indexOf("+d="))}.00</p>
                                <PaypalButton
                                    cost={this.props.location.search.slice((this.props.location.search.indexOf("c=") + 2), this.props.location.search.indexOf("+d="))}
                                    week={this.props.location.search.slice((this.props.location.search.indexOf("w=") + 2), this.props.location.search.indexOf("+n="))}
                                    hash={this.props.location.search.slice((this.props.location.search.indexOf("t=") + 2), this.props.location.search.indexOf("+a="))}
                                    numberOfChildren={this.props.location.search.slice((this.props.location.search.indexOf('x=') + 2), this.props.location.search.indexOf("+p="))} 
                                />
                            </section>
                        :
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
}



export default Paypal;
