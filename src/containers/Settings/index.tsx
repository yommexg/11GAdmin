import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Logout from "./logout";
import ProfileData from "./profileData";
import ProfilePic from "./profilepic";

const Settings: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="md:ml-[250px] flex flex-col justify-center">
        <div className="overflow-y-auto h-[80vh] md:h-[90vh]">
          <ProfilePic />
          <ProfileData />
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default Settings;
