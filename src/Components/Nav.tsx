import { signOut } from "firebase/auth";
import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../Firebase/firebase.config";
import { useAuth } from "../Hooks/useAuth";
import logo from  "../assets/IMG-20241227-WA0025.jpg";

const Nav = () => {
  const { isLoggedIn, role } = useAuth();
  const handleCart = () => {
    if (!isLoggedIn) {
      toast.warning("Please login to view cart");
    }
  };
  return (
    <Navbar fluid rounded className=" shadow-md bg-slate-100 ">
      <Navbar.Brand>
        <img
          src={logo}
          alt="Logo"
          className=" h-20  "
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        {!isLoggedIn && (
          <Navbar.Link>
            <Link to={"/signup"}>Sign Up</Link>
          </Navbar.Link>
        )}

        {isLoggedIn && role === "admin" && (
          <Navbar.Link>
            <Link to={"/add-product"}>Add Products</Link>
          </Navbar.Link>
        )}
        {isLoggedIn && role === "admin" && (
          <Navbar.Link>
            <Link to={"/all-products"}>All Products</Link>
          </Navbar.Link>
        )}

        {isLoggedIn && role === "admin" && (
          <Navbar.Link>
            <Link to={"/users"}>Users</Link>
          </Navbar.Link>
        )}

        {isLoggedIn && role === "user" && (
          <Navbar.Link>
            <Link to={"/cart"} onClick={handleCart}>
              Cart
            </Link>
          </Navbar.Link>
        )}

        {!isLoggedIn && (
          <Navbar.Link>
            <Link to={"/login"}>Login</Link>
          </Navbar.Link>
        )}

        {isLoggedIn && (
          <Navbar.Link>
            <Button
              gradientMonochrome="success"
              onClick={() => {
                signOut(auth);
              }}
            >
              Logout
            </Button>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
