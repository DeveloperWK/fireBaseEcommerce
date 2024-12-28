import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomButton from "./CustomButton";

const CheckOutForm = () => {
  const cart = useSelector(
    (state: { cart: { price: number; quantity: number }[] }) => state.cart
  );
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  const stripe = useStripe();
  const stripeElements = useElements();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !stripeElements) {
      return;
    }
    const { error: stripeError } = await stripeElements.submit();
    if (stripeError) {
      setError(stripeError.message || "");
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_STRIPE_BACKEND_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "usd",
        amount: totalPrice * 100,
      }),
    });
    const { client_secret: clientSecret } = await res.json();
    const { error } = await stripe.confirmPayment({
      elements: stripeElements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
    });

    if (error) {
      setError(error.message || "");
    }
  };
  return (
    <form className="w-full container mt-10" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email-input" className="block mb-2">
          Email
        </label>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="johndoe@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div className="mb-3">
        <PaymentElement />
      </div>
      <button type="submit" disabled={!stripe || !stripeElements}>
        <CustomButton color="blue">Pay</CustomButton>
      </button>
      {error && toast.error(error)}
    </form>
  );
};

export default CheckOutForm;
