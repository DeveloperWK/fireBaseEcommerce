import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CustomButton from "../Components/CustomButton";
import { auth, db } from "../Firebase/firebase.config";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }; // implement this Change function

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User ID is undefined. Please try again.");
      }
      await setDoc(doc(db, "users", userId), {
        email: user.email,
        password: user.password,
        role: "user",
      });
      setIsLoading(true);
      setError("");
      navigate("/");
      toast.success("User created successfully");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setIsLoading(false);
    }
  };
  if (error) {
    toast.error(error);
    setError("");
  }
  // Aikhan
  return (
    <section className="m-auto mt-10 max-w-md">
      <form className="flex max-w-md flex-col gap-4" onSubmit={submitHandler}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="name@flowbite.com"
            onChange={changeHandler}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            name="password"
            onChange={changeHandler}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        {!isLoading && (
          <button type="submit" disabled={isLoading}>
            <CustomButton color={"success"}> Sign Up </CustomButton>
          </button>
        )}
        {isLoading && toast.info("User is creating...")}
        {}
      </form>
    </section>
  );
};

export default Signup;
