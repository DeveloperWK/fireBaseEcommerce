import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { modifyQuantityOfAnItem, removeFromCart } from "../Features/cartSlice";
import CustomButton from "./CustomButton";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const dispatch = useDispatch();
  const minusHandler = () => {
    if (itemQuantity > 1) {
      dispatch(
        modifyQuantityOfAnItem({
          id: item.id,
          quantity: itemQuantity - 1,
        })
      );
      setItemQuantity(itemQuantity - 1);
    } else {
      toast.error("Quantity can't be less than 1");
    }
  };
  const plusHandler = () => {
    if (itemQuantity) {
      dispatch(
        modifyQuantityOfAnItem({
          id: item.id,
          quantity: itemQuantity + 1,
        })
      );
      setItemQuantity(itemQuantity + 1);
    }
  };
  const removeHandler = () => {
    dispatch(removeFromCart(item.id));
  };
  return (
    <table className="cart__table m-5 border-2 border-black w-full ">
      <tr>
        <td>
          <div className="cart__item p-3">
            <img src={item.image} alt={item.title} className="h-40" />
          </div>
        </td>
        <td className="cart__item ">
          <div className="m-5">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </td>
        <td>
          <div className="m-5">
            <p>Price: {item.price} BDT</p>
          </div>
        </td>
        <td>
          <div className="m-5 minus">
            <button
              data-action="minus"
              type="button"
              onClick={minusHandler}
              className="border-2 border-black p-2"
            >
              -
            </button>
            <input
              type="number"
              value={itemQuantity}
              onChange={(e) => {
                dispatch(
                  modifyQuantityOfAnItem({
                    id: item.id,
                    quantity: Number(e.target.value),
                  })
                );
                setItemQuantity(Number(e.target.value));
              }}
              className="border-2 border-black p-2 w-24 text-center"
            />
            <button
              data-action="plus"
              type="button"
              onClick={plusHandler}
              className="border-2 border-black p-2"
            >
              +
            </button>
          </div>
        </td>
        <td>
          <div className="m-5">
            <p>Total: {item.price * itemQuantity} BDT</p>
          </div>
        </td>
        <td>
          <div className="m-5">
            <button onClick={removeHandler}>
              <CustomButton color="failure">Remove</CustomButton>
            </button>
          </div>
        </td>
      </tr>
    </table>
  );
};

export default CartItem;
