import React from 'react'
import { paypalMessage, paypalAction } from '../constants/variables';


const PaypalButton = props => {
    let selection = props.key;
    let hash = props.hash;
    return (
        <form action={process.env.GATSBY_PAYPAL_ACTION} method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value={hash}/>
            <table>
                <tr><td><input type="hidden" name="on0" value="Number of Weeks" />Number of Weeks</td></tr><tr><td>
                {props.amountDue?
                    <select name="os0">
                        <option value="1Week" selected={selection === "1Week"}>1Week $180.00 USD</option>
                        <option value="2Week" selected={selection === "2Week"}>2Week $205.00 USD</option>
                        <option value="3Week" selected={selection === "3Week"}>3Week $230.00 USD</option>
                        <option value="4Week" selected={selection === "4Week"}>4Week $255.00 USD</option>
                        <option value="6Week" selected={selection === "6Week"}>6Week $280.00 USD</option>
                        <option value="7Week" selected={selection === "7Week"}>7Week $305.00 USD</option>
                        <option value="8Week" selected={selection === "8Week"}>8Week $330.00 USD</option>
                        <option value="9Week" selected={selection === "9Week"}>9Week $355.00 USD</option>
                        <option value="10Week" selected={selection === "10Week"}>10Week $380.00 USD</option>
                        <option value="11Week" selected={selection === "11Week"}>11Week $405.00 USD</option>
                    </select>
                :props.lessThan5?
                    <select name="os0">
                        <option value="1Week" selected={selection === "1Week"}>1Week $180.00 USD</option>
                        <option value="2Week" selected={selection === "2Week"}>2Week $360.00 USD</option>
                        <option value="3Week" selected={selection === "3Week"}>3Week $230.00 USD</option>
                        <option value="4Week" selected={selection === "4Week"}>4Week $255.00 USD</option>
                    </select>
                :
                    <select name="os0">
                        <option value="5Week">5Week $775.00 USD</option>
                        <option value="6Week">6Week $930.00 USD</option>
                        <option value="7Week">7Week $1,085.00 USD</option>
                        <option value="8Week">8Week $1,240.00 USD</option>
                        <option value="9Week">9Week $1,395.00 USD</option>
                        <option value="10Week">10Week $1,550.00 USD</option>
                        <option value="11Week">11Week $1,705.00 USD</option>
                    </select>
                }
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
        totalWeeksSelected: 0
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
        let amountDue = this.state.amountDue;
        let totalCost = this.state.totalCost;
        let totalWeeksSelected = this.state.totalWeeksSelected;
        let amountDueButtonHash;
        let totalCostButtonHash;
        let key = totalWeeksSelected + "Week"
        let amountDueOption = key + " $" + amountDue + " USD";
        let totalCostOption = key + " $" + totalCost + " USD";
        let amountDueKey = key;
        if(amountDueKey === "5Week") {
            amountDueKey = "6Week";
        }
        amountDueButtonHash = process.env.GATSBY_PAYPAL_AMOUNTDUE_BUTTON_HASH;
        if(totalWeeksSelected < 5) {
            totalCostButtonHash = process.env.GATSBY_PAYPAL_TOTALCOST1_BUTTON_HASH;
        } else {
            totalCostButtonHash = process.env.GATSBY_PAYPAL_TOTALCOST2_BUTTON_HASH;
        }
        this.setState({totalCostButtonHash, amountDueKey, amountDueButtonHash, key, amountDueOption, totalCostOption})
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
                            <PaypalButton amountDue={true} key={this.amountDueKey} hash={this.state.amountDueButtonHash} lessThan5={false}/>
                            <p>...or pay the total cost of ${this.state.totalCost}.</p>
                            <PaypalButton amountDue={false} key={this.state.key} hash={this.state.totalCostButtonHash} lessThan5={this.props.totalWeeksSelected<5}/>
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
