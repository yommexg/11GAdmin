import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { CarAss } from "../../../types";

const OtherCarAssDetails = () => {
  const carAss = useSelector(
    (state: RootState) => state.carAss.oneCarAssData as CarAss
  );

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(carAss?.price);

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
          {carAss?.discount}&#37;{" "}
        </span>
      </p>
      <p>
        Quantity:{" "}
        <span className="italic text-blue-500 ml-1 font-bold">
          {carAss?.quantity}
        </span>
      </p>
    </div>
  );
};

export default OtherCarAssDetails;
