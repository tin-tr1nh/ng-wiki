import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequestPayload } from '../signup/sign-up-request.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BACKEND_ENDPOINT = 'http://localhost:8080'
  readonly SIGN_UP_ENDPOINT = `${this.BACKEND_ENDPOINT}/auth/register`

  constructor(private httpClient: HttpClient) { }


  signUp(payload: SignUpRequestPayload): Observable<any>{
    return this.httpClient.post(this.SIGN_UP_ENDPOINT, payload)
  }
}
