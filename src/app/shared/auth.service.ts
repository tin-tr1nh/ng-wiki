import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequestPayload } from '../signup/sign-up-request.payload';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  SignInRequestPayload,
  SignInResponse,
} from '../sign-in/sign-in-request.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BACKEND_ENDPOINT = 'http://localhost:8080';
  readonly SIGN_UP_ENDPOINT = `${this.BACKEND_ENDPOINT}/auth/register`;
  readonly SIGN_IN_ENDPOINT = `${this.BACKEND_ENDPOINT}/auth/login`;
  readonly REFRESH_TOKEN_ENDPOINT = `${this.BACKEND_ENDPOINT}/auth/refresh-token`;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signUp(payload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post(this.SIGN_UP_ENDPOINT, payload);
  }

  signIn(payload: SignInRequestPayload): Observable<any> {
    return this.httpClient
      .post<SignInResponse>(this.SIGN_IN_ENDPOINT, payload)
      .pipe(
        tap((data) => {
          this.localStorage.store('accessToken', data.accessToken);
          this.localStorage.store('refreshToken', data.refreshToken);
        })
      );
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
    };
    return this.httpClient
      .post<SignInResponse>(this.REFRESH_TOKEN_ENDPOINT, refreshTokenPayload)
      .pipe(
        tap((response) => {
          this.localStorage.store('accessToken', response.accessToken);
          this.localStorage.store('refreshToken', response.refreshToken);
        })
      );
  }

  retrieveLocalStorage(key: string): string {
    return this.localStorage.retrieve(key);
  }

  getAccessToken(): string {
    return this.retrieveLocalStorage('accessToken');
  }

  getRefreshToken(): string {
    return this.retrieveLocalStorage('refreshToken');
  }
}
