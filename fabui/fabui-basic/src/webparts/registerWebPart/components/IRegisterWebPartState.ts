export interface IRegisterWebPartState {
  userid : string;
  password : string;
  name : string;
  email: string;
  phone: string;
  membership : IMembershipType;
  subscribe: boolean;
}

export interface IMembershipType {
  code : number;
  text: string;
}
