import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { ChangeEvent, FormEvent } from "react";

interface Product {
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  tags: string;
}

interface ProductFormProps {
  props: {
    addProduct: Product;
    submitHandler: (e: FormEvent<HTMLFormElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    buttonText: string;
  };
}

const ProductForm = ({ props }: ProductFormProps) => {
  return (
    <>
      <form
        className="flex max-w-md flex-col gap-4 m-auto h-screen mt-5"
        onSubmit={props.submitHandler}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Product Title" />
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            name="title"
            value={props.addProduct.title}
            onChange={props.handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Product Price" />
          </div>
          <TextInput
            id="small"
            type="number"
            sizing="sm"
            name="price"
            value={props.addProduct.price}
            onChange={props.handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Product Description" />
          </div>
          <TextInput
            id="large"
            type="text"
            sizing="lg"
            name="description"
            value={props.addProduct.description}
            onChange={props.handleChange}
          />
        </div>
        <div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Product Category" />
            </div>
            <TextInput
              id="small"
              type="text"
              sizing="sm"
              name="category"
              value={props.addProduct.category}
              onChange={props.handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Product Stock" />
            </div>
            <TextInput
              id="small"
              type="number"
              sizing="sm"
              name="stock"
              value={props.addProduct.stock}
              onChange={props.handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Product Tags" />
            </div>
            <TextInput
              id="small"
              type="text"
              sizing="sm"
              name="tags"
              value={props.addProduct.tags}
              onChange={props.handleChange}
            />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Upload file" />
          </div>
          <FileInput id="file-upload" onChange={props.handleImageChange} />
        </div>
        <button>
          <Button color="green">{props.buttonText}</Button>
        </button>
        {/* <CustomButton color={"green"} content={"Add Product"} /> */}
      </form>
    </>
  );
};

export default ProductForm;
