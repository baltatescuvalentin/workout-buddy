export interface IRegisterForm {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirm_password: string;
  age: number;
  height: number;
  weight: number;
  sex: string;
}

export interface ILoginForm {
  userName: string;
  password: string;
}
