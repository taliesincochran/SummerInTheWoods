import React from 'react'
import { paypalMessage, paypalAction } from '../constants/variables';


const PaypalButton = props => {
    return (
        <form action={process.env.GATSBY_PAYPAL_ACTION} method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value={props.hash}/>
            <table>
                <tr><td><input type="hidden" name="on0" value="Number of Weeks" />Number of Weeks</td></tr><tr><td>
                    <select name="os0">
                        <option value={props.week} selected>{`${props.week} $${props.cost}.00 USD`}</option>
                    </select>
                </td></tr>
	        </table>
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />                <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>                
    )
}

class Paypal extends React.Component {
    state = {
        amountDue: 0,
        totalCost: 0,
        totalWeeks: 0
    }
    componentDidMount() {
        let queryString = this.props.location.search.split("?")[1];
        let queryParameters = queryString.split("+");
        queryParameters.forEach(parameter=> {
            let paramName = parameter.split("=")[0];
            let paramValue = parameter.split("=")[1];
            this.setState({[paramName]: [paramValue]},()=>this.getCost());
        });
    }
    getCost = () => {
        let totalCostButtonHash;
        let amountDueButtonHash;
        if(this.state.totalWeeks < 3) {
            amountDueButtonHash = process.env.GATSBY_PAYPAL_AMOUNTDUE1_BUTTON_HASH;
            totalCostButtonHash = process.env.GATSBY_PAYPAL_TOTALCOST1_BUTTON_HASH;
        } else {
            totalCostButtonHash = process.env.GATSBY_PAYPAL_TOTALCOST2_BUTTON_HASH;
            amountDueButtonHash = process.env.GATSBY_PAYPAL_AMOUNTDUE2_BUTTON_HASH;
        }
        this.setState({totalCostButtonHash, amountDueButtonHash})
    }
    render() {
        return (
            this.state.amountDue?
                <div>
                    <p>{paypalMessage}</p>
                    <div id="main">
                        <div className="inner">
                            <section>
                            <p>Pay amount due of ${this.state.amountDue} to reserve your childs spot</p>
                            <PaypalButton cost={this.state.amountDue} week={this.state.totalWeeks} hash={this.state.amountDueButtonHash} />
                            <p>...or pay the total cost of ${this.state.totalCost}.</p>
                            <PaypalButton cost={this.state.totalCost} week={this.state.totalWeeks} hash={this.state.totalCostButtonHash} />
                        </section>
                    </div>
                </div>
            </div>
            :
            null
        )
    }
}



export default Paypal;
