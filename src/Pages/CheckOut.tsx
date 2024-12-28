import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../Components/CheckOutForm";

const options = {
  mode: "payment" as const,
  amount: 1000,
  currency: "usd",
};
const CheckOut = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  return (
    <div className="container flex mx-auto justify-center items-center w-full">
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default CheckOut;
