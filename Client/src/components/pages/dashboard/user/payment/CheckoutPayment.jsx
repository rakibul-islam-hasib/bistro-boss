import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../../providers/AuthProvider';
import '../payment/Payment.css'
import { useCart } from '../../../../../hooks/useCart';
import axios from 'axios';
const CheckoutPayment = ({ price }) => {
    const stripe = useStripe();
    const axiosSecure = useAxiosSecure();
    const elements = useElements();
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState();
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [cart] = useCart();
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
                        email: user?.email || 'Not_provided'
                    },
                },
            },
        );

        if (cardConfirmError) {
            console.log(cardConfirmError, 'from card confirm error')
        }
        console.log(paymentIntent, 'payment intent')
        if (paymentIntent.status === 'succeeded') {
            const transactionId = paymentIntent.id;

            setTransactionId(transactionId)
            if (transactionId) {
                const payment = {
                    transactionId,
                    email: user?.email,
                    name: user?.displayName,
                    amount: price,
                    cartId: cart.map(item => item.itemId)
                }
                // axios.post('/post-payment-info', payment)
                // .then(res => { 
                //     console.log(res.data)
                // })
                fetch('http://localhost:5000/post-payment-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payment)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    }) 
                    // console.log(JSON.stringify(payment), 'payment')

            }

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
            <button className={` ${processing ? 'bg-blue-400' : 'bg-blue-600'} px-5 py-2 rounded-lg text-white mt-3`} type="submit" disabled={!stripe || processing}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutPayment;