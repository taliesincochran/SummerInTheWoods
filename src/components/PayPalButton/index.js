import React from 'react';
import PaypalExpressBtn from './PayPalExpressCheckOut';


const CLIENT = {
  sandbox: 'AWWcIJcu29SSDdZYPz0HC5MN0C1PBwpOWR7qLwYaDV_GrljNDZcizJ_DutPBL4iajY-S08lRXwx_oqhA',
  production: 'xxxXXX',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class App extends React.Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
          <div>
            <PaypalExpressBtn
              client={CLIENT}
              env={ENV}
              commit={true}
              currency={'USD'}
              total={100}
              onSuccess={onSuccess}
              onError={onError}
              onCancel={onCancel}
            />
          </div>
        );
      }
    }

    export default App;
// export default class MyApp extends React.Component {
//     render() {		
//         const onSuccess = (payment) => {
//             console.log("Your payment was succeeded!", payment);
//         }	        
//         const onCancel = (data) => {
//             // User pressed "cancel" or close Paypal's popup! 
//             console.log('You have cancelled the payment!', data);
//         }	        
//         const onError = (err) => {
//  // The main Paypal's script cannot be loaded or somethings block the loading of that script! 
//             console.log("Error!", err);
// // Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js" 
// // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			 
//         }		            
//         let currency = 'USD'; // or you can set this value from your props or state   
//         let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout 
//  return (
//             <PaypalExpressBtn 
// currency={currency}
// total={total}
// onError={onError}
// onSuccess={onSuccess}
// onCancel={onCancel}
//  />
//         );
//     }  
//  }