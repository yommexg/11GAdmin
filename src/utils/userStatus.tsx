interface Status {
  [key: number]: string;
}
export const statusName: Status = {
  2: "Seller",
  0: "Unregisterd",
  1: "Buyer",
  "-1": "Suspended",
};

export const statusColor: Status = {
  0: "#FFC300",
  1: "green",
  2: "orange",
  "-1": "red",
};
