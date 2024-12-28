import { Link, useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError() as { status?: string };

  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <p style={{ color: "red", fontSize: "30px" }}>
          {error.status == "404" ? "404 Page Not Found" : "Something went wrong"}
        </p>
        <Link to="/" className="text-blue-700 text-xl hover:underline m-3" >Back to Home</Link>
      </section>
    </>
  );
};

export default Error;
