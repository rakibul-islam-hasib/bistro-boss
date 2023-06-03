import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../../providers/AuthProvider';
const CheckoutPayment = ({ price }) => {
    const stripe = useStripe();
    const axiosSecure = useAxiosSecure();
    const elements = useElements();
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState();
    const [transactionId , setTransactionId] = useState(''); 
    const [processing, setProcessing] = useState(false); 

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(result => {
                setClientSecret(result.data.clientSecret)
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
        setProcessing(true)
        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email : user?.email || 'Not_provided'
                    },
                },
            },
        );

        if (cardConfirmError) {
            console.log(cardConfirmError , 'from card confirm error')
        }
        console.log(paymentIntent , 'payment intent')
        if (paymentIntent.status === 'succeeded') {
            const transactionId = paymentIntent.id ; 
            
            setTransactionId(transactionId)


        }
    setProcessing(false)
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
            {transactionId && <p className='text-xs text-green-500'>Your payment is successful . Transaction ID : {transactionId}</p>}
            <button className='bg-blue-600 px-5 py-2 rounded-lg text-white mt-3' type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutPayment;