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
      <p>
        Price:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {formattedPrice}
        </span>
      </p>
      <p>
        Discount:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.discount}&#37;
        </span>
      </p>
      <p>
        Quantity:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.quantity}
        </span>
      </p>
      <p>
        Brand:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.carBrand}
        </span>
      </p>
      <p>
        Color:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.carColor}
        </span>
      </p>
      <p>
        Year:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.year}
        </span>
      </p>
      <p>
        Gear Type:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.gearType}
        </span>
      </p>
      <p>
        Fuel Type:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.energyType}
        </span>
      </p>
      <p>
        Engine Number:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.engineNumber}
        </span>
      </p>
      <p>
        Engine Type:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {usedCar?.engineType}
        </span>
      </p>
    </div>
  );
};

export default OtherUsedCarDetails;
