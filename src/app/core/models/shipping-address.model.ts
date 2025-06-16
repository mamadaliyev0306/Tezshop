import { CountryMethod } from "./enum/country-method.enum";
export interface ShippingAddress {
    id: number;
    userId: number;
    recipientName: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    region: string;
    postalCode: string;
    country: CountryMethod;
    createdAt: string; // ISO string
    updatedAt: string;
  } 