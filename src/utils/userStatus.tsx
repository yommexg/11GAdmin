interface Status {
  [key: number]: string;
}
export const statusName: Status = {
  3: "Awaiting",
  2: "Seller",
  0: "Unregisterd",
  1: "User",
  "-1": "Suspended",
};

export const statusColor: Status = {
  0: "#FFC300",
  1: "blue",
  2: "green",
  3: "orange",
  "-1": "red",
};
