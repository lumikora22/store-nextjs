// import React from 'react';
// import { CardElement, Elements } from '@stripe/react-stripe-js';
// import { STRIPE_TOKEN } from '../../../utils/constants';
// import FormPayment from './FormPayment/FormPayment';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(STRIPE_TOKEN);

// export default function Payment({ products, address }) {
// 	return (
// 		<Elements stripe={stripePromise}>
// 			<form className="form-payment">
//         <CardElement />
//       </form>
// 			<FormPayment products={products} address={address} />
// 		</Elements>
// 	);
// 	return (
// 		<div className='payment'>
// 			<div className='title'>Pago </div>
// 			<div className='data'></div>
// 		</div>
// 	);
// }

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	'pk_test_51KwUSREHWaWtpHmCGbJFENjP4Cd3ntZrUDfnPttcsEW8Z9GEQspCEefUkp6CEOfY3IuXqVNuXX7kIIcmc6jkVpLs00Ps4E2cEx'
);

function Payment() {
	const options = {
		// passing the client secret obtained from the server
		clientSecret:
			'sk_test_51KwUSREHWaWtpHmCtYxQ1UpRB9ZzBBZxtDkW3pmbUgusIpJnMMoHntiNai1GNanMgDvBano4pEexdMglVyuXDkmU00L7m9AVLZ',
	};

	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm />
		</Elements>
	);
}

export default Payment;

import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
	return (
		<form>
			<PaymentElement />
			<button>Submit</button>
		</form>
	);
};
