import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { NewCar } from "../../../types";

const OtherNewCarDetails = () => {
  const newCar = useSelector(
    (state: RootState) => state.newCar.oneNewCarData as NewCar
  );

  return (
    <div className="mx-2 flex flex-col gap-5 md:flex-wrap text-sm md:text-[20px] md:flex-row bg-gray-200 px-2 py-6">
      <p className="text-blue-700">
        Price:{" "}
        <span className="italic text-black ml-1 font-semibold">
          &#8358;{newCar?.price}
        </span>
      </p>
      <p className="text-[#800080]">
        Discount:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.discount}&#37;
        </span>
      </p>
      <p className="text-[#FFA500]">
        Quantity:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.quantity}
        </span>
      </p>
      <p className="text-[#00FF00]">
        Brand:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.carBrand}
        </span>
      </p>
      <p className="text-[#FF00FF]">
        Year:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.year}
        </span>
      </p>
      <p className="text-[#A52A2A]">
        Gear Type:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.gearType}
        </span>
      </p>
      <p className="text-[#808080]">
        Fuel Type:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.energyType}
        </span>
      </p>
      <p className="text-[#079b9b]">
        Engine Number:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.engineNumber}
        </span>
      </p>
      <p className="text-[#e24d4d]">
        Engine Type:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {newCar?.engineType}
        </span>
      </p>
    </div>
  );
};

export default OtherNewCarDetails;
