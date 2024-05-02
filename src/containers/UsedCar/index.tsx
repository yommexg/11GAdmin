import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { RootState } from "../../redux/store";
import { UsedCar as UsedCarType } from "../../../types";
import Spinner from "../../components/Spinner";
import UsedCar from "./usedCar";
import AddUsedCar from "./addUsedCar";

const UsedCars: React.FC = () => {
  const usedCarData = useSelector(
    (state: RootState) => state.usedCar.usedCarsData as UsedCarType[]
  );

  const loadingUsedCars = useSelector(
    (state: RootState) => state.usedCar.loading
  );

  return (
    <div>
      {loadingUsedCars && <Spinner />}
      <Sidebar />
      <Navbar />
      <div className="md:ml-[250px] bg-white">
        <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 flex items-center justify-between bg-white shadow-2xl">
          <h2 className="font-bold text-2xl">Used Cars</h2>
          <AddUsedCar />
        </div>
        <div className="flex flex-wrap justify-center gap-8 px-2 py-4">
          {usedCarData.length > 0 &&
            usedCarData?.map((item) => <UsedCar key={item._id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default UsedCars;
