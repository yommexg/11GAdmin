interface Status {
  [key: number]: string;
}

const pendingImg = new URL("../assets/carStatus/pending.png", import.meta.url)
  .href;

const availiableImg = new URL(
  "../assets/carStatus/availiable.png",
  import.meta.url
).href;

const declineImg = new URL("../assets/carStatus/decline.png", import.meta.url)
  .href;

const soldOutImg = new URL("../assets/carStatus/soldout.png", import.meta.url)
  .href;

export const statusImage: Status = {
  0: pendingImg,
  1: availiableImg,
  "-1": soldOutImg,
  "-2": declineImg,
};

export const statusName: Status = {
  0: "Pending",
  1: "Availiable",
  "-1": "Sold Out",
  "-2": "Declined",
};

export const statusColor: Status = {
  0: "#FFC300",
  1: "green",
  "-1": "#800000",
  "-2": "red",
};
