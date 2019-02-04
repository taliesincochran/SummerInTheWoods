import * as React from "react";

class Failure extends React.Component {
    render() {
        return (
            <div>
                <div id="main">
                    <div className="inner">
                        <h2>Your paypal payment failed.  Please contact us through the contact form and arrange another way to pay.</h2>
                    </div>
                </div>
            </div>
        )
    }
}



export default Failure;