import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { UsedCar } from "../../../types";

const OtherUsedCarDetails = () => {
  const usedCar = useSelector(
    (state: RootState) => state.usedCar.oneUsedCarData as UsedCar
  );

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(usedCar?.price);

  return (
    <div className="flex flex-col gap-5 text-xs md:text-base">
      <p className="text-blue-700">
        Price:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {formattedPrice}
        </span>
      </p>
      <p className="text-[#800080]">
        Discount:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.discount}&#37;
        </span>
      </p>
      <p className="text-[#FFA500]">
        Quantity:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.quantity}
        </span>
      </p>
      <p className="text-[#00FF00]">
        Brand:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.carBrand}
        </span>
      </p>
      <p className="text-[#02063b]">
        Color:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.carColor}
        </span>
      </p>
      <p className="text-[#FF00FF]">
        Year:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.year}
        </span>
      </p>
      <p className="text-[#A52A2A]">
        Gear Type:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.gearType}
        </span>
      </p>
      <p className="text-[#808080]">
        Fuel Type:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.energyType}
        </span>
      </p>
      <p className="text-[#079b9b]">
        Engine Number:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.engineNumber}
        </span>
      </p>
      <p className="text-[#e24d4d]">
        Engine Type:{" "}
        <span className="italic text-black ml-1 font-semibold">
          {usedCar?.engineType}
        </span>
      </p>
    </div>
  );
};

export default OtherUsedCarDetails;
