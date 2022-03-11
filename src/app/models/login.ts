import { ILogin } from '../interfaces/ilogin';

export class Login implements ILogin {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
