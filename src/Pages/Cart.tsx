import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CartItem from "../Components/CartItem";
import CustomButton from "../Components/CustomButton";
import { emptyCart } from "../Features/cartSlice";

const Cart = () => {
  const cartItems = useSelector(
    (state: {
      cart: {
        id: string;
        title: string;
        description: string;
        price: number;
        quantity: number;
        image: string;
      }[];
    }) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-300 p-3">
        <h1 className="text-3xl font-bold text-center text-red-700">
          Cart is empty
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center bg-slate-300 p-3">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <div className="flex justify-between items-center">
          <div>
            <p className=" text-[2rem] font-bold text-center">
              Total: {totalPrice} BDT
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                dispatch(emptyCart());
                navigate("/");
              }}
            >
              <CustomButton color="failure">Clear Cart</CustomButton>
            </button>
          </div>
          <div>
            <button onClick={() => navigate("/cart/checkout")}>
              <CustomButton color="success">Checkout Now</CustomButton>
            </button>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Cart;
