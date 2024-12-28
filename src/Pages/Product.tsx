import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { addToCart } from "../Features/cartSlice";
import { useGetProductQuery } from "../Features/firebaseApiSlice";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductQuery(id ?? "", {
    refetchOnMountOrArgChange: true,
  }) as ReturnType<typeof useGetProductQuery>;
  const buyNowHandler = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const addToCartHandler = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };
  return (
    <>
      {isLoading && toast.info("Loading...")}
      {isError && toast.error(error.message)}
      <section className="container border border-gray-400  rounded-lg p-4 w-3/4 mx-auto mt-4 shadow bg-gray-100">
        {product && (
          <div className="flex items-center justify-between">
            <div className="product__img">
              <img src={product.image} alt={product.title} className="h-40" />
            </div>
            <div className="product__details ">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-gray-500">{product.description}</p>
              <p className="text-gray-500">Price: {product.price} BDT</p>
              <p className="text-gray-500">Stock: {product.stock}</p>
              <p className="text-gray-500">tags: {product.tags}</p>
            </div>
            <div className="product__action flex flex-col justify-between gap-3">
              <button onClick={addToCartHandler}>
                <Button color="purple" pill>
                  Add to Cart
                </Button>
              </button>
              <button onClick={buyNowHandler}>
                <Button color="success" pill>
                  Buy Now
                </Button>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Product;
