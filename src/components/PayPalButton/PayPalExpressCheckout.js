import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';
import paypal from 'paypal-checkout';
 
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    window.React = React;
    window.ReactDOM = ReactDOM;
    this.state = {
      showButton: true,
      // env: 'sandbox', // Or 'sandbox'
      // client: {
      //   sandbox:    'AWWcIJcu29SSDdZYPz0HC5MN0C1PBwpOWR7qLwYaDV_GrljNDZcizJ_DutPBL4iajY-S08lRXwx_oqhA', // sandbox client ID
      //   production: 'xxxxxxxxx' // production client ID
      // },
      // commit: true, // Show a 'Pay Now' button
    };
  }
  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }
  componentDidUpdate({ isScriptLoaded, isScriptLoadSucceed }) {
    if (!this.state.show) {
      if (isScriptLoaded && !this.props.isScriptLoaded) {
        if (isScriptLoadSucceed) {
          this.setState({ showButton: true });
        } else {
          console.log('Cannot load Paypal script!');
          this.props.onError();
        }
      }
    }
  }
 
  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    }= this.props;

    const{
      showButton
    } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          onSuccess(payment);
        });

    return(
      <div>
        {
          <paypal.Button.driver
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
        />}
      </div>);
    // const payment = () => paypal.rest.payment.create(this.props.env, this.props.client, {
    //   transactions: [
    //                 { amount: { total: this.props.total, currency: this.props.currency } },
    //   ],
    // });
 
    // const onAuthorize = (data, actions) => actions.payment.execute().then(() => {
    //   const payment = Object.assign({}, this.props.payment);
    //   payment.paid = true;
    //   payment.cancelled = false;
    //   payment.payerID = data.payerID;
    //   payment.paymentID = data.paymentID;
    //   payment.paymentToken = data.paymentToken;
    //   payment.returnUrl = data.returnUrl;
    //   this.props.onSuccess(payment);
    // });
 
    // let ppbtn = '';
    // if (this.state.showButton) {
    //   ppbtn = (<paypal.button.react
    //     env={this.state.env}
    //     client={this.state.client}
    //     payment={payment}
    //     commit
    //     onAuthorize={onAuthorize}
    //     onCancel={this.props.onCancel}
    //   />);
    // }
    // return <div>{ppbtn}</div>;
  }
}
 
// PaypalButton.propTypes = {
//   currency: PropTypes.string.isRequired,
//   total: PropTypes.number.isRequired,
//   //client: PropTypes.object.isRequired,
// };
 
// PaypalButton.defaultProps = {
//   env: 'sandbox',
//   onSuccess: (payment) => {
//     console.log('The payment was succeeded!', payment);
//   },
//   onCancel: (data) => {
//     console.log('The payment was cancelled!', data);
//   },
//   onError: (err) => {
//     console.log('Error loading Paypal script!', err);
//   },
// };
 
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);