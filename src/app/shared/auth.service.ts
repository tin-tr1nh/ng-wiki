import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequestPayload } from '../signup/sign-up-request.payload';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signUp(payload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post(this.SIGN_UP_ENDPOINT, payload);
  }

  signIn(payload: SignInRequestPayload): Observable<any> {
    console.log("Call signIn")
    return this.httpClient
      .post<SignInResponse>(this.SIGN_IN_ENDPOINT, payload)
    .pipe(map((data) => this.localStorage.store('token', data.tokenValue)));
  }
}
