import { toast } from "react-toastify";
import { useGetUsersQuery } from "../Features/firebaseApiSlice";

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery({}, { refetchOnMountOrArgChange: true }) as ReturnType<
    typeof useGetUsersQuery
  >;
  if (isLoading) {
    return toast.info("Users Loading...");
  }
  if (isError) {
    return toast.error(`Users Data Error ${error.message}`);
  }
  interface User {
    id: string;
    email: string;
    role: string;
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center text-red-600 underline">
          Users
        </h1>
        {!isLoading &&
          !isError &&
          users?.map((user: User) => (
            <div
              key={user.id}
              className="p-3 border border-gray-400 rounded-lg w-1/4 mx-auto m-3 hover:scale-105 transition duration-300 ease-in-out "
            >
              <p className="font-bold">
                <span className="text-blue-600">Name:</span> {user.email}
              </p>
              <p className="font-bold">
                <span className="text-purple-900">Role:</span> {user.role}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Users;
