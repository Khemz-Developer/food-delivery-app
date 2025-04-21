
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);
//console.log(import.meta.env.VITE_Stripe_PK);
const Payment = () => {
  const [cart] = useCart();

  // calculate the prices
  const cartTotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalPrice = parseFloat(parseFloat(cartTotal).toFixed(2));
  //console.log(cartTotal);
  //console.log(cart);
  //console.log(totalPrice);
  
  return (
    <div className="container max-w-screen-xl px-24 py-12 ">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
