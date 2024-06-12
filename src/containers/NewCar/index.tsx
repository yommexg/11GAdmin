import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { RootState } from "../../redux/store";
import { NewCar as NewCarType } from "../../../types";
import NewCar from "./newCar";
import AddNewCar from "./addNewCar";

const NewCars: React.FC = () => {
  const newCarData = useSelector(
    (state: RootState) => state.newCar.newCarsData as NewCarType[]
  );

  const sortedCarData = Array.isArray(newCarData)
    ? newCarData.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
      })
    : [];

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="md:ml-[250px] bg-white">
        <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 flex items-center justify-between bg-white shadow-2xl ">
          <h2 className="font-bold text-2xl">New Cars</h2>
          <AddNewCar />
        </div>
        <div className="overflow-y-auto h-[80vh]">
          <div className="flex w-[100%] flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
            {sortedCarData.length > 0 &&
              sortedCarData?.map((item) => (
                <NewCar key={item._id} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCars;
