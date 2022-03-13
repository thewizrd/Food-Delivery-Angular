import { Injectable } from '@angular/core';
import { IJwtResponse } from '../interfaces/ijwt-response';

const TOKEN_KEY = 'jwt-token';
const TOKEN_RESP_KEY = 'token-resp';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  clearStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_RESP_KEY);
  }

  public saveToken(jwtToken: IJwtResponse) {
    localStorage.setItem(TOKEN_KEY, jwtToken.token);
    localStorage.setItem(TOKEN_RESP_KEY, JSON.stringify(jwtToken));
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getTokenResponse(): IJwtResponse | null {
    const resp = localStorage.getItem(TOKEN_RESP_KEY);

    if (resp) {
      return JSON.parse(resp);
    }

    return null;
  }
}
