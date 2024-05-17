import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import UsersTable from "./usersTable";
import { RootState } from "../../redux/store";
import { User } from "../../../types";

const Users: React.FC = () => {
  const allUsers = useSelector(
    (state: RootState) => state.getUser.allUsers as User[]
  );

  const sortedUsers = allUsers.slice().sort((userA, userB) => {
    if (userA.role === "Admin" && userB.role !== "Admin") {
      return -1;
    } else if (userA.role !== "Admin" && userB.role === "Admin") {
      return 1;
    } else {
      return userA.username.localeCompare(userB.username);
    }
  });

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="md:ml-[250px] bg-white">
        <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 bg-white shadow-2xl ">
          <h2 className="font-bold text-2xl text-center">Users</h2>
        </div>
        {allUsers.length > 0 && <UsersTable users={sortedUsers} />}
      </div>
    </div>
  );
};

export default Users;
