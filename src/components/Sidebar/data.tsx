const dashoardImg = new URL(
  "../../assets/sidebarImages/dashboard.png",
  import.meta.url
).href;

// const sellImg = new URL(
//   "../../assets/sidebarImages/sell-car.png",
//   import.meta.url
// ).href;

const newCarImg = new URL(
  "../../assets/sidebarImages/new-car.png",
  import.meta.url
).href;

const usedCarImg = new URL(
  "../../assets/sidebarImages/used-car.png",
  import.meta.url
).href;

const carAssImg = new URL(
  "../../assets/sidebarImages/car-ass.png",
  import.meta.url
).href;

const usersImg = new URL(
  "../../assets/sidebarImages/users.png",
  import.meta.url
).href;

// const orderImg = new URL(
//   "../../assets/sidebarImages/order.png",
//   import.meta.url
// ).href;

const settingsImg = new URL(
  "../../assets/sidebarImages/settings.png",
  import.meta.url
).href;

export const sidebarData = [
  {
    name: "Dashboard",
    link: "/",
    imgSrc: dashoardImg,
  },

  // {
  //   name: "Sell Car Request",
  //   link: "/sell-car",
  //   imgSrc: sellImg,
  // },

  {
    name: "New Cars",
    link: "/new-cars",
    link2: "/new-cars/*",
    imgSrc: newCarImg,
  },

  {
    name: "Used Cars",
    link: "/used-cars",
    link2: "/used-cars/*",
    imgSrc: usedCarImg,
  },

  {
    name: "Car Accessories",
    link: "/car-ass",
    link2: "/car-ass/*",
    imgSrc: carAssImg,
  },

  {
    name: "Users",
    link: "/users",
    imgSrc: usersImg,
  },

  // {
  //   name: "Orders",
  //   link: "/orders",
  //   imgSrc: orderImg,
  // },

  {
    name: "Settings",
    link: "/settings",
    imgSrc: settingsImg,
  },
];
