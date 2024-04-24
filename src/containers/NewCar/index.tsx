import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { RootState } from "../../redux/store";
import { NewCar as NewCarType } from "../../../types";
import NewCar from "./newCar";
import Spinner from "../../components/Spinner";

const NewCars: React.FC = () => {
  const newCarData = useSelector(
    (state: RootState) => state.newCar.newCarsData as NewCarType[]
  );

  const loadingNewCars = useSelector(
    (state: RootState) => state.newCar.loading
  );

  return (
    <div>
      {loadingNewCars && <Spinner />}
      <Sidebar />
      <Navbar />
      <div className="md:ml-[250px] bg-white">
        <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 flex items-center justify-between bg-white shadow-2xl">
          <h2 className="font-bold text-2xl">New Cars</h2>
          <FaPlus
            size={37}
            className="cursor-pointer bg-black text-white p-2"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-8 px-2 py-4">
          {newCarData.length > 0 &&
            newCarData?.map((item) => <NewCar key={item._id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default NewCars;
