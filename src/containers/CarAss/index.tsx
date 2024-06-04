import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { RootState } from "../../redux/store";
import { CarAss as CarAssType } from "../../../types";
import CarItems from "./carAss";
import AddCarAss from "./addCarAss";

const CarAss: React.FC = () => {
  const carAssData = useSelector(
    (state: RootState) => state.carAss.carAssData as CarAssType[]
  );

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="md:ml-[250px] bg-white">
        <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 flex items-center justify-between bg-white shadow-2xl ">
          <h2 className="font-bold text-2xl">Car Accessories</h2>
          <AddCarAss />
        </div>{" "}
        <div className="overflow-y-auto h-[80vh]">
          <div className="flex flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
            {carAssData.length > 0 &&
              carAssData?.map((item) => (
                <CarItems key={item._id} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarAss;
