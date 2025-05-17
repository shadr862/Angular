export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface GuestForm {
  guestName: string;
  age: number;
}

export interface BookingDetailsGet {
  bookingID: number;
  roomId: number;
  guestName: string;
  guestEmail: string;
  mobileNumber: string;
  checkinDate: string;       // or Date, if parsed
  checkoutDate: string;      // or Date
  bookingStatus: string;
  bookingAmount: number;
  bookingDate: string;       // or Date
  tnC: boolean;
  passport?: string;
  address: Address;
  guestForm: GuestForm[];
}
