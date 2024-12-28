import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useGetProductQuery } from "../Features/firebaseApiSlice";
import { db } from "../Firebase/firebase.config";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error, isSuccess } = useGetProductQuery(
    id ?? ""
  ) as ReturnType<typeof useGetProductQuery>;
  // const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    stock: 0,
    tags: "",
  });
  const [isImageLoading, setIsImageLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      toast.info("Loading...");
    }
    if (isError) {
      toast.error(error.message);
    }
    if (isSuccess) {
      setEditProduct({
        title: data?.title,
        price: data?.price,
        description: data?.description,
        image: data?.image,
        category: data?.category,
        stock: data?.stock,
        tags: data?.tags,
      });
    }
    // setIsEditing(true);
  }, [isSuccess, data]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]:
        e.target.name === "price" || e.target.name === "stock"
          ? Number(e.target.value)
          : e.target.value,
    });
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true);
    const file = e.target.files?.[0];
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "firstApp");
    data.append("cloud_name", "dhagnak0m");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dhagnak0m/image/upload`,
      {
        method: "post",
        body: data,
      }
    );
    const result = await res.json();
    setEditProduct({ ...editProduct, image: result.secure_url });
    setIsImageLoading(false);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      try {
        const productRef = doc(db, "products", id);
        if (isImageLoading) {
          toast.info("Image is Uploading, please wait...");
          return;
        }
        await updateDoc(productRef, {
          ...editProduct,
        });
        toast.success(`Product Updated Successfully ${id}`);
        navigate("/all-products");
        console.log(productRef);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Product ID is missing");
    }
  };

  return (
    <>
      {" "}
      <ProductForm
        props={{
          addProduct: editProduct,
          handleImageChange,
          submitHandler,
          handleChange,
          buttonText: "Update Product",
        }}
      />
      <div className="img m-5 text-center">
        <p className="text-2xl font-bold">Image Preview</p>
        <img
          src={editProduct?.image}
          alt={editProduct?.title}
          width={200}
          className="m-auto "
        />
      </div>
    </>
  );
};

export default EditProduct;
