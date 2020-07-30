import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { SignInResponse } from './sign-in/sign-in-request.payload';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getAccessToken()) {
      req = this.addAccessTokenToReq(req, this.authService.getAccessToken());
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status == 401) {
          return this.handleAuthError(req, next);
        }
        return throwError(error);
      })
    );
  }

  handleAuthError(req: HttpRequest<any>, next: HttpHandler) {
    // if we are exchanging for refresh token.
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: SignInResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(
            refreshTokenResponse.accessToken
          );
          return next.handle(
            this.addAccessTokenToReq(req, refreshTokenResponse.accessToken)
          );
        })
      );
    }
  }

  addAccessTokenToReq(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
