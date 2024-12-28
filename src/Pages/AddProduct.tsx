import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ProductForm from "../Components/ProductForm";
import { useAddProductsMutation } from "../Features/firebaseApiSlice";

const AddProduct = () => {
  const [addProducts] = useAddProductsMutation();
  const [addProduct, setAddProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    stock: 0,
    tags: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.name === "price" || e.target.name === "stock"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setAddProduct({ ...addProduct, image: result.secure_url });
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addProduct.image) {
      toast.info("Image is Uploading, please wait...");
      return;
    }
    await addProducts(addProduct); // call the mutation
    toast.success("Product Added Successfully");
    navigate("/");
  };
  return (
    <section>
      <ProductForm
        props={{
          addProduct,
          handleChange,
          handleImageChange,
          submitHandler,
          buttonText: "Add Product",
        }}
      />
    </section>
  );
};

export default AddProduct;
