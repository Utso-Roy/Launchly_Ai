import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import '../../Components/CheckoutForm/CheackOut.css'
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';
import axios from 'axios';
    const CheckoutForm = ({subscriptionAmount }) => {
  const stripe = useStripe();
        const elements = useElements();
        const [processing, setProcessing] = useState(false)
       const [clientSecret, setClientSecret] = useState(null);

useEffect(() => {
  const createPaymentIntent = async () => {
    try {
      if (!subscriptionAmount) {
        console.error("subscriptionAmount is undefined");
        return;
      }

      const amount = parseFloat(subscriptionAmount);
      if (isNaN(amount)) {
        console.error("Invalid subscriptionAmount:", subscriptionAmount);
        return;
      }

      const amountInCents = Math.round(amount * 100);
      const res = await axios.post("http://localhost:3000/create-payment-intent", {
        amount: amountInCents,
      });

      setClientSecret(res.data.clientSecret); 
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  createPaymentIntent();
}, [subscriptionAmount]);


   const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      toast.error("Stripe not ready or clientSecret missing");
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card element not found");
      setProcessing(false);
      return;
    }

    // 1. Create payment method
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      toast.error(methodError.message);
      setProcessing(false);
      return;
    }

    // 2. Confirm the payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      console.log("💸 PaymentIntent:", paymentIntent);

      // এখানে চাইলে সাবস্ক্রিপশন ডাটাবেজে POST করতে পারো
      // await axios.post("/subscription", {...});
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button className='bg-green-600 text-white btn' type="submit" disabled={!stripe||processing}>
      {processing? <ClockLoader size={20} color='#21BEDA' /> : ` Pay ${subscriptionAmount }`
 }
      </button>
    </form>
  );
};

export default CheckoutForm;