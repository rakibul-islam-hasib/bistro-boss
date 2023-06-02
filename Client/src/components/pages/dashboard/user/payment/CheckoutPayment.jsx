import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
const CheckoutPayment = ({ price }) => {
    const stripe = useStripe();
    const axiosSecure = useAxiosSecure();
    const elements = useElements();
    const [error, setError] = useState('');

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
        .then(result => { 
            console.log(result.data)
        })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            if (error.message) {
                setError(error.message)
            }
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

    }


    return (
        <form className='w-[80%] mx-auto' onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='text-xs text-red-500 text-center'>{error}</p>
            <button className='bg-blue-600 px-5 py-2 rounded-lg text-white mt-3' type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutPayment;