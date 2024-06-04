import { useState } from "react";
import { User } from "../../../types";
import { FiMail, FiPhone } from "react-icons/fi";
import { statusColor, statusName } from "../../utils/userStatus";
import { FaAngleDown } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/store";
import { updateUserStatus } from "../../redux/slice/getUserSlice";
import { toast } from "react-toastify";

const noAvatar = new URL("../../assets/noAvatar.png", import.meta.url).href;

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const UsersTable: React.FC<{ users: User[] }> = ({ users }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(
    new Array(users.length).fill(false)
  );

  const [isReasonPopupOpen, setIsReasonPopupOpen] = useState(false);
  const [selectedUserStatus, setSelectedUserStatus] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  const [reason, setReason] = useState("");

  const handleReasonChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReason(event.target.value);
  };

  const handleOpenReason = (status: string, email: string) => {
    setIsReasonPopupOpen(true);
    setSelectedUserStatus(status);
    setSelectedUserEmail(email);
  };

  const handleCloseReason = () => setIsReasonPopupOpen(false);

  const dispatch = useAppDispatch();

  const accessToken: string | null = localStorage.getItem("accessToken");

  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;

  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const handleOpenDropDown = (clickedIndex: number) => {
    setIsDropDownOpen((isDropDownStates) => {
      const newDropDownStates = [...isDropDownStates];
      // Close any previously opened dropdown
      newDropDownStates.fill(false);
      // Open the dropdown for the clicked user
      newDropDownStates[clickedIndex] = true;
      return newDropDownStates;
    });
  };

  const handleCloseDropDown = () => {
    setIsDropDownOpen(new Array(users.length).fill(false));
  };

  const userStatusOptions = ["User", "Seller", "Suspend"];

  const handleImageClick = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
    }
  };

  const handleDocumentClick = (documentUrl: string) => {
    if (documentUrl) {
      setSelectedDocument(documentUrl);
    }
  };

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  };

  const handleStatusChange = (
    email: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleCloseDropDown();

    const userStatus = (event.target as HTMLButtonElement).textContent;

    if (email && userId) {
      if (userStatus === "User") {
        handleOpenReason("User", email);
      } else if (userStatus === "Seller") {
        dispatch(
          updateUserStatus({
            userId,
            email,
            status: 2,
          })
        );
      } else if (userStatus === "Suspend") {
        handleOpenReason("Suspend", email);
      }
    }
  };

  const handleUserStatusWithReason = async () => {
    if (!reason) {
      toast.error("Please Input Reason");
    }
    if (reason && userId) {
      handleCloseReason();
      if (selectedUserStatus === "Suspend") {
        dispatch(
          updateUserStatus({
            userId,
            email: selectedUserEmail,
            status: -1,
            reason,
          })
        );
      } else if (selectedUserStatus === "User") {
        dispatch(
          updateUserStatus({
            userId,
            email: selectedUserEmail,
            status: 1,
            reason,
          })
        );
      }

      setReason("");
    }
  };

  return (
    <div className="overflow-x-auto p-2">
      <div className="inline-block min-w-full sm:px-4 lg:px-8">
        <div className="overflow-hidden shadow rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 rounded-l-lg bg-white text-center text-xs min-w-[30px] font-medium text-black uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-5 py-3  bg-gray-500 text-left text-xs min-w-[300px] font-medium text-white uppercase tracking-wider "
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-50 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Role
                </th>

                <th
                  scope="col"
                  className="px-5 py-3  bg-gray-500 text-center text-xs min-w-[300px] font-medium text-white uppercase tracking-wider "
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-50 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Date Registered
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-500 text-center text-xs font-medium text-white uppercase tracking-wider"
                >
                  Document
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-50 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.email}>
                  <td className="px-3 py-2 text-sm text-center">{index + 1}</td>
                  <td className="px-3 my-3 py-2 text-sm flex gap-2 md:gap-5 items-center">
                    <div className="w-[50px] cursor-pointer">
                      <img
                        src={user.avatar ? user.avatar : noAvatar}
                        alt={user.username}
                        className="h-12 w-12 rounded-full"
                        onClick={() =>
                          user.avatar && handleImageClick(user.avatar)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-blue-600">{user.username}</p>
                      <a
                        href={`mailto:${user.email}`}
                        className="flex items-center gap-2 text-xs transition-all hover:font-bold"
                      >
                        <FiMail />
                        {user.email}
                      </a>
                      <a
                        href={`tel:${user.phoneNumber}`}
                        className="flex items-center gap-2 text-xs transition-all hover:font-bold"
                      >
                        <FiPhone /> {user.phoneNumber}
                      </a>
                    </div>
                    {selectedImage && (
                      <div className="fixed inset-0 bg-[#1B1B1B] bg-opacity-65 flex justify-center items-center z-50 p-4">
                        <img
                          src={selectedImage}
                          alt={user.username}
                          className="max-w-screen max-h-screen object-contain"
                        />
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute top-0 right-2 bg-black px-3 py-1 rounded-full text-white text-xl hover:text-opacity-75"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </td>
                  <td
                    className={`px-3 py-2 text-sm text-center font-semibold ${
                      user.role === "Admin" ? "text-red-600" : "text-blue-600"
                    }`}
                  >
                    {user.role}
                  </td>

                  <td className="px-3 py-2 text-sm text-center">
                    <p>
                      {user.address.houseNo}, {user.address.street},
                    </p>
                    <p>
                      {user.address.city}, {user.address.state},
                    </p>
                    <p>{user.address.country}.</p>
                  </td>
                  <td className="px-3 py-2 text-sm text-center">
                    {formatDate(user.date)}
                  </td>
                  <td className="px-3 py-2 text-sm text-center relative">
                    {user.role === "Admin"
                      ? ""
                      : (user.status as unknown as number) === (2 || 3) &&
                        user.document?.name && (
                          <div
                            className="font-semibold text-sm sm:text-base flex justify-center items-center gap-5 cursor-pointer"
                            onClick={() =>
                              user.document?.file &&
                              handleDocumentClick(user.document?.file)
                            }
                          >
                            {user?.document?.name}
                            <img
                              src={user?.document?.file && user.document.file}
                              alt={user?.document?.name}
                              className="h-10 w-10 rounded-lg"
                            />
                          </div>
                        )}
                    {selectedDocument && (
                      <div className="fixed inset-0 bg-[#1B1B1B] bg-opacity-65 flex justify-center items-center z-50 p-4">
                        <img
                          src={selectedDocument}
                          alt={user.username}
                          className="max-w-screen max-h-screen object-contain"
                        />
                        <button
                          onClick={() => setSelectedDocument(null)}
                          className="absolute top-0 right-2 bg-black px-3 py-1 rounded-full text-white text-xl hover:text-opacity-75"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-sm text-center relative">
                    {user.role === "Admin" ? (
                      ""
                    ) : (
                      <p
                        className="font-semibold text-right text-sm sm:text-base flex justify-center items-center gap-2"
                        style={{
                          color: statusColor[user.status as unknown as number],
                        }}
                      >
                        {statusName[user.status as unknown as number]}
                        <FaAngleDown
                          className="text-black cursor-pointer relative"
                          onClick={() => handleOpenDropDown(index)}
                        />
                      </p>
                    )}
                    {isDropDownOpen[index] && (
                      <div className="absolute bg-white z-50 rounded-lg pt-8 shadow-md px-8 -top-32 right-0">
                        <button
                          onClick={handleCloseDropDown}
                          className="absolute top-0 right-0 px-3 py-1 text-xl hover:text-opacity-75"
                        >
                          X
                        </button>
                        <ul className="list-none">
                          {userStatusOptions.map((status) => (
                            <li key={status} className="mb-5">
                              <button
                                className="px-3 bg-[#1B1B1B] text-white py-2 rounded-md text-left focus:outline-none hover:bg-gray-300"
                                onClick={(event) => {
                                  if (
                                    statusName[
                                      user.status as unknown as number
                                    ] !== status
                                  ) {
                                    handleStatusChange(user.email, event);
                                  }
                                  handleCloseDropDown();
                                }}
                              >
                                {status}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isReasonPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-90 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">
              Reason for Action <span className="text-red-500">*</span>
            </h3>
            <textarea
              className="px-4 w-full bg-slate-200  py-2 rounded-md focus:outline-none focus:border-blue-500"
              rows={5}
              placeholder="Enter Reason"
              value={reason}
              onChange={handleReasonChange}
            />
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleCloseReason}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleUserStatusWithReason}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
