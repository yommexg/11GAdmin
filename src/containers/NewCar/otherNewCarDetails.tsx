import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { NewCar } from "../../../types";

const OtherNewCarDetails = () => {
  const newCar = useSelector(
    (state: RootState) => state.newCar.oneNewCarData as NewCar
  );

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(newCar?.price);

  return (
    <div className="mx-2 flex md:flex-wrap flex-col gap-5 text-xs md:text-base md:flex-row bg-gray-200 px-2 py-6">
      <p>
        Price:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {formattedPrice}
        </span>
      </p>
      <p>
        Discount:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.discount}&#37;
        </span>
      </p>
      <p>
        Quantity:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.quantity}
        </span>
      </p>
      <p>
        Brand:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.carBrand}
        </span>
      </p>
      <p>
        Color:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.carColor}
        </span>
      </p>
      <p>
        Year:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.year}
        </span>
      </p>
      <p>
        Gear Type:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.gearType}
        </span>
      </p>
      <p>
        Fuel Type:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.energyType}
        </span>
      </p>
      <p>
        Engine Number:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.engineNumber}
        </span>
      </p>
      <p>
        Engine Type:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {newCar?.engineType}
        </span>
      </p>
    </div>
  );
};

export default OtherNewCarDetails;
