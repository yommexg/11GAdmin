import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Logout from "./logout";

const Settings: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="md:ml-[250px]">
        <Logout />
      </div>
    </div>
  );
};

export default Settings;
