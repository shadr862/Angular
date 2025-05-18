
export interface Employee {
  Name: string;
  Email: string;
  Phone: string;
  JoiningDate: string;
  Role:string;
  Address: AddressE;
  RelationalStatusForm: RelationalStatusForm[];
  Allow: boolean;
}

export interface AddressE {
  AddressLine: string;
  City: string;
  Country: string;
}

export interface RelationalStatusForm {
  Name: string;
  Status: string;
}

export interface EmployeeDetailsGet {
  employeeId: number;
  name: string;
  email: string;
  phone: string;
  joiningDate?: string | null; // ISO string or null
  role:string,
  allow: boolean;
  religion?: string | null;

  address: AddressGet;

  relationalStatusList: RelationalStatusGet[];
}

export interface AddressGet {
  addressId: number;
  addressLine: string;
  city: string;
  country: string;
}

export interface RelationalStatusGet {
  relationalStatusId: number;
  name: string;
  status: string;
}
