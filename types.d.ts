export interface User {
  email?: string;
  phoneNumber?: string;
  status?: number;
  username?: string;
  avatar?: string;
}

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
