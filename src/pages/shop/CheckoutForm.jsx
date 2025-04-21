import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  
 const {user} = useAuth();
  const [clientSecret, setClientSecret] = useState("");

  const [cardError, setCardError] = useState("");
  const navigate = useNavigate();

  
useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log('Price is not a number or less than 1:', price);
      return;
    }
    axiosSecure.post("/create-payment-intent", {price})
      .then((res) => {
        if (res.data.clientSecret) {
          console.log('Client secret received:', res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        } else {
          console.error("Client secret not found in response:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching payment intent:", error); 
      });
  }, [price, axiosSecure]);
  
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements ) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("success !");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const {paymentIntent, error:confirmError} = 
    await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "unknown",
            },
          },
        });
      if(confirmError){
        console.log(confirmError);
      }
      console.log( paymentIntent);
      if(paymentIntent.status === "succeeded"){
        CheckoutForm.propTypes = {
            cart: PropTypes.arrayOf(PropTypes.object).isRequired,
            price: PropTypes.number.isRequired,
          };

        

        console.log(paymentIntent.id);
        setCardError(`Your transaction was successful, transaction  id: ${paymentIntent.id}`)

        const paymentInfo ={
            email: user ? user.email : 'unknown',
            transitionId: paymentIntent.id,
            price,
            quantity: cart ? cart.length : 0,
            itemName: cart ? cart.map((item) => item.name) : [],
            cartItems: cart ? cart.map((item) => item._id) : [],
            menuItems: cart ? cart.map((item) => item.menuItemId) : [],
        }
        console.log(paymentInfo);
        
        axiosSecure.post("/payment",paymentInfo)
        .then((res)=>{
            console.log(res.data);
            alert("Payment successful");
            navigate('/address');
        })
    }
  };

  
  return (
    <div className="flex flex-col items-start justify-start gap-8 py-5 sm:flex-row">
      {/*left side */}
      <div className="py-5 my-6 space-y-3 md:w-1/2">
        <h4 className="text-lg font-semibold">Billing Information</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
       
      </div>

      {/*right side */}
      <div className="w-full max-w-sm px-4 py-8 mx-5 space-y-5 shadow-2xl md:w-1/2 card shrink-0 bg-base-100">
        <h4 className="text-lg font-semibold">Process your Payment</h4>
        <p>Credit/Debit Card</p>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="w-full mt-5 text-white rounded-md btn-primary btn-sm btn"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-xs italic text-red">{cardError}</p>
        ) : null}

        {/*pay pal */}
        <div className="flex items-center justify-center">
          <button
            className="mt-5 text-white bg-orange-500 rounded-md btn-sm btn"
            type="submit"
          >
            <FaPaypal />
            Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
