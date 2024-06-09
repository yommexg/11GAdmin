import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NewCar as NewCarType, User } from "../../../types";
import { CarAss as CarAssType } from "../../../types";
import { UsedCar as UsedCarType } from "../../../types";

const newIcon = new URL("../../assets/icon/newIcon.png", import.meta.url).href;

const usedIcon = new URL("../../assets/icon/usedIcon.png", import.meta.url)
  .href;

const userIcon = new URL("../../assets/icon/userIcon.png", import.meta.url)
  .href;

const carAssIcon = new URL("../../assets/icon/carAssIcon.jpg", import.meta.url)
  .href;

const HomeCards: React.FC = () => {
  const newCarData = useSelector(
    (state: RootState) => state.newCar.newCarsData as NewCarType[]
  );

  const carAssData = useSelector(
    (state: RootState) => state.carAss.carAssData as CarAssType[]
  );

  const usedCarData = useSelector(
    (state: RootState) => state.usedCar.usedCarsData as UsedCarType[]
  );

  const allUsers = useSelector(
    (state: RootState) => state.getUser.allUsers as User[]
  );

  return (
    <div className="grid grid-cols-2 gap-5 mx-1 md:mx-6 lg:mx-12 my-6">
      <div className="bg-white shadow-xl px-6 py-8">
        <img src={newIcon} className="w-10" />
        <h1 className="mt-4 font-bold text-lg">New Cars</h1>
        <p className="text-blue-600 italic mt-6">
          Total:
          <span className="not-italic ml-3   text-black font-semibold">
            {newCarData.length}
          </span>
        </p>
        <p className="text-green-600 italic mt-3">
          Availiable:
          <span className="not-italic ml-3   text-black font-semibold">
            {newCarData.filter((item) => item.status === 1).length}
          </span>
        </p>
        <p className="text-yellow-800 italic mt-3">
          Pending:
          <span className="not-italic ml-3   text-black font-semibold">
            {newCarData.filter((item) => item.status === 0).length}
          </span>
        </p>
        <p className="text-red-600 italic mt-3">
          Sold Out:
          <span className="not-italic ml-3   text-black font-semibold">
            {newCarData.filter((item) => item.status === -1).length}
          </span>
        </p>
      </div>
      <div className="bg-white shadow-xl px-6 py-8">
        <img src={usedIcon} className="w-10" />
        <h1 className="mt-4 font-bold text-lg">Used Cars</h1>
        <p className="text-blue-600 italic mt-6">
          Total:
          <span className="not-italic ml-3   text-black font-semibold">
            {usedCarData.length}
          </span>
        </p>
        <p className="text-green-600 italic mt-3">
          Availiable:
          <span className="not-italic ml-3   text-black font-semibold">
            {usedCarData.filter((item) => item.status === 1).length}
          </span>
        </p>
        <p className="text-yellow-800 italic mt-3">
          Pending:
          <span className="not-italic ml-3   text-black font-semibold">
            {usedCarData.filter((item) => item.status === 0).length}
          </span>
        </p>
        <p className="text-red-600 italic mt-3">
          Sold Out:
          <span className="not-italic ml-3   text-black font-semibold">
            {usedCarData.filter((item) => item.status === -1).length}
          </span>
        </p>
        <p className="text-purple-600 italic mt-3">
          Decline:
          <span className="not-italic ml-3   text-black font-semibold">
            {usedCarData.filter((item) => item.status === -2).length}
          </span>
        </p>
      </div>
      <div className="bg-white shadow-xl px-6 py-8">
        <img src={carAssIcon} className="w-10" />
        <h1 className="mt-4 font-bold text-lg">Car Accessories</h1>
        <p className="text-blue-600 italic mt-6">
          Total:
          <span className="not-italic ml-3   text-black font-semibold">
            {carAssData.length}
          </span>
        </p>
        <p className="text-green-600 italic mt-3">
          Availiable:
          <span className="not-italic ml-3   text-black font-semibold">
            {carAssData.filter((item) => item.status === 1).length}
          </span>
        </p>
        <p className="text-yellow-800 italic mt-3">
          Pending:
          <span className="not-italic ml-3   text-black font-semibold">
            {carAssData.filter((item) => item.status === 0).length}
          </span>
        </p>
        <p className="text-red-600 italic mt-3">
          Sold Out:
          <span className="not-italic ml-3   text-black font-semibold">
            {carAssData.filter((item) => item.status === -1).length}
          </span>
        </p>
      </div>
      <div className="bg-white shadow-xl px-6 py-8">
        <img src={userIcon} className="w-10" />
        <h1 className="mt-4 font-bold text-lg">Users</h1>
        <p className="text-blue-600 italic mt-6">
          Total:
          <span className="not-italic ml-3   text-black font-semibold">
            {allUsers.length}
          </span>
        </p>
        <p className="text-black italic mt-3">
          Admin:
          <span className="not-italic ml-3   text-black font-semibold">
            {allUsers.filter((item) => item.role === "Admin").length}
          </span>
        </p>
        <p className="text-green-600 italic mt-3">
          Seller:
          <span className="not-italic ml-3   text-black font-semibold">
            {
              allUsers.filter(
                (item) =>
                  item.role === "User" &&
                  (item.status as unknown as number) === 2
              ).length
            }
          </span>
        </p>
        <p className="text-yellow-800 italic mt-3">
          Request:
          <span className="not-italic ml-3   text-black font-semibold">
            {
              allUsers.filter(
                (item) =>
                  item.role === "User" &&
                  (item.status as unknown as number) === 3
              ).length
            }
          </span>
        </p>
        <p className="text-purple-800 italic mt-3">
          Non Seller:
          <span className="not-italic ml-3   text-black font-semibold">
            {
              allUsers.filter(
                (item) =>
                  item.role === "User" &&
                  (item.status as unknown as number) === 1
              ).length
            }
          </span>
        </p>

        <p className="text-red-600 italic mt-3">
          Suspended:
          <span className="not-italic ml-3   text-black font-semibold">
            {
              allUsers.filter(
                (item) => (item.status as unknown as number) === -1
              ).length
            }
          </span>
        </p>
      </div>
    </div>
  );
};

export default HomeCards;
