import React from "react"
const setButton = (amountDue)=>{
    let value = "";
    switch (amountDue){
        case amountDue == 120:
            value= '120';
            break;
        case amountDue == 135:
            value= '135';
            break;
        case amountDue == 145:
            value= '145';
            break;
        case amountDue == 150:
            value= '150';
            break;
        case amountDue == 160:
            value= '160';
            break;
        case amountDue == 170:
            value= '170';
            break;
        case amountDue == 175:
            value= "175";
            break;
        case amountDue == 185:
            value= "185";
            break;
        case amountDue == 195:
            value= "195";
            break;
        case amountDue == 200:
            value= "200";
            break;
        // case amountDue == 210:
        //     value= "";
        //     break;
        // case amountDue == 220:
        //     value= "";
        //     break;
        // case amountDue == 225:
        //     value= "";
        //     break;
        // case amountDue == 235:
        //     value= "";
        //     break;
        // case amountDue == 245:
        //     value= "";
        //     break;
        // case amountDue == 250:
        //     value= "";
        //     break;
        // case amountDue == 260:
        //     value= "";
        //     break;
        // case amountDue == 270:
        //     value= "";
        //     break;
        // case amountDue == 275:
        //     value= "";
        //     break;
        // case amountDue == 285:
        //     value= "";
        //     break;
        // case amountDue == 300:
        //     value= "";
        //     break;
        // case amountDue == 325:
        //     value= "";
        //     break;
            default:
                value = "120";
                break;
        }
        return value;     

}
    
const PaypalButton = props => {
    return(
        <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="BF2VLGNDHEM5W" />
            <table>
                <tr><td><input type="hidden" name="on0" value="Weeks" />Weeks</td></tr><tr><td>
                <select name="os0">
                    <option value={setButton(props.value)}>{`$${setButton(props.value)}.00 USD`}</option>
                </select> </td></tr>
            </table>
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
            <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form> 
    )
}
export default PaypalButton