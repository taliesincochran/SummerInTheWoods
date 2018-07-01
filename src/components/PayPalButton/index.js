import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

const AddWeekButton = props => {
    return (
        <div>
            <form 
                target="paypal" 
                action="https://www.paypal.com/cgi-bin/webscr" 
                method="post"
            >
            <input 
                type="hidden" 
                name="cmd" 
                value="_s-xclick"
            />
            <input 
                type="hidden" 
                name="hosted_button_id" 
                value="U4ZM5P4ALNKWA" 
            />
            <input 
                type="image" 
                src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_SM.gif" 
                border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" 
            />
            <img 
                alt="" 
                border="0" 
                src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" 
                width="1" 
                height="1" 
            />
        </form>
      <div>
    )
}


export default AddWeekButton
