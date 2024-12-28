import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../Features/firebaseApiSlice";
interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  tags: string;
}

const AllProducts = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  ) as ReturnType<typeof useGetProductsQuery>;

  // useEffect(() => {
  //   refetch();
  // }, [data]);
  const [
    deleteProduct,

    {
      isLoading: isDeleting,
      isError: isDeletingError,
      error: deletingError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteProductMutation();
  const navigate = useNavigate();
  // const [deleteId, setDeleteId] = useState("");
  if (isLoading) return toast.info("Products Loading..."); //Loading toast false holeo hote thake kn
  if (isError) return toast.error(error.message);
  if (data?.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-center text-red-600">
          No Products Found
        </h1>
      </div>
    );
  }

  const deleteHandler = (deleteId: string) => {
    deleteProduct(deleteId);
  };
  const editHandler = (editId: string) => {

    console.log(editId);
    navigate(`/edit-product/${editId}`);

  };

  if (isDeleting) return toast.info("Deleting...");
  if (isDeletingError) return toast.error((deletingError as Error).message);
  if (deleteSuccess) {
    toast.success("Product Deleted Successfully");
  }

  // Aikhan Ar Product ase nh Akbar akta remove korle
  return (
    <>
      <section className="container border border-gray-400  rounded-lg p-4 w-3/4 mx-auto mt-4 shadow bg-gray-100">
        {!isLoading &&
          !isError &&
          data?.map((product: Product) => (
            <div
              className="product__container flex justify-between items-center pb-3"
              key={product.id}
            >
              <div className="product__img ">
                <img
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                />
              </div>
              <div className="product__info text-xl">
                <h1>
                  <span>Name: </span>
                  {product.title}
                </h1>
                <p>
                  {" "}
                  {/* Aita keno ase */}
                  <span>Description: </span>
                  {product.description}
                </p>
                <p>
                  {" "}
                  <span>Price: </span>
                  {product.price}
                </p>
                <p>
                  {" "}
                  <span>Category: </span>
                  {product.category}
                </p>
                <p>
                  {" "}
                  <span>Stock: </span>Product Stock
                </p>
                <p>
                  {" "}
                  <span>Tags: </span> {product.tags}
                </p>
              </div>
              <div className="product_action">
                <button>
                  <Button
                    gradientMonochrome="failure"
                    onClick={() => deleteHandler(product.id)}
                  >
                    Remove
                  </Button>
                </button>
                <button className="ml-2">
                  <Button
                    gradientMonochrome="info"
                    onClick={() => editHandler(product.id)}
                  >
                    Edit
                  </Button>
                </button>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default AllProducts;
