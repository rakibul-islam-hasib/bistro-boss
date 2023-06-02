import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutPayment from './CheckoutPayment';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE)
const Payment = () => {
    const location = useLocation(); 
    const price = location.state?.price ; 
    return (
        <div>
            <h1>Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckoutPayment price={price} /> 
            </Elements>
        </div>
    );
};

export default Payment;