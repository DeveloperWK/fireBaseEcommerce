import { Outlet } from "react-router";
import Nav from "../Components/Nav";

const Root = () => {
  return (
    <>
      <div className="sidebar">
        <Nav />
      </div>
      <div className="details">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
