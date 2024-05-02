import { useSelector } from "react-redux";

import { UsedCar } from "../../../types";
import { RootState } from "../../redux/store";

const UsedCarAddress: React.FC = () => {
  const usedCar = useSelector(
    (state: RootState) => state.usedCar.oneUsedCarData as UsedCar
  );

  const address = usedCar?.carLocation;

  const seller = usedCar?.user;

  return (
    <div className="flex flex-col gap-4 text-xs md:text-base">
      {/* <h2 className="md:text-center font-bold text-[18px] mb-2">Car Address</h2> */}
      <p>
        Email:{" "}
        <span className="font-semibold text-blue-600 ml-1">
          {seller?.email}
        </span>
      </p>
      <p>
        Phone Number:{" "}
        <span className="font-semibold text-blue-600 ml-1">
          {seller?.phoneNumber}
        </span>
      </p>
      <p>
        Bus Stop / Land Mark:{" "}
        <span className="font-semibold text-teal-600 ml-1">
          {address?.busStop}
        </span>
      </p>
      <p>
        City:{" "}
        <span className="text-red-500 font-semibold ml-1">{address?.city}</span>
      </p>
      <p>
        State:{" "}
        <span className="font-semibold ml-1 text-purple-600">
          {address?.state}
        </span>
      </p>
      <p>
        Country:{" "}
        <span className="font-semibold ml-1 text-green-600">
          {address?.country}
        </span>
      </p>
    </div>
  );
};

export default UsedCarAddress;
