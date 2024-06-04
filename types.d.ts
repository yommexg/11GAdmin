export enum UserRole {
  ADMIN = 5150,
  USER = 2001,
}

export interface NewCar {
  _id: string;
  carName: string;
  carBrand: string;
  year: number;
  gearType: string;
  energyType: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  engineType: string;
  engineNumber: string;
  carColor: string;
  status: number;
  carImage: [string];
  createdAt: string;
}

export interface CarLocation {
  busStop: string;
  city: string;
  state: string;
  country: string;
}
export interface UsedCar {
  _id: string;
  user?: User;
  userId: string;
  carName: string;
  carBrand: string;
  carLocation: CarLocation;
  year: number;
  gearType: string;
  energyType: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  engineType: string;
  engineNumber: string;
  carColor: string;
  status: number;
  plateNumber: string;
  carImage: [string];
  createdAt: string;
}

export interface CarAss {
  _id: string;
  itemName: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  status: number;
  itemImage: [string];
  createdAt: string;
}

interface User {
  _id: string;
  email: string;
  username: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    houseNo: string;
  };
  avatar?: string;
  status: string;
  role: string;
  deleteMessage?: string;
  date: string;
  document?: {
    name: string;
    file: string;
  };
}
