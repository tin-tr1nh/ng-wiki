import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInRequestPayload } from './sign-in-request.payload';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isError: false;
  signInRequestPayload: SignInRequestPayload;

  signIn() {
    this.signInRequestPayload.username = this.loginForm.get('username').value;
    this.signInRequestPayload.password = this.loginForm.get('password').value;

    this.authService
      .signIn(this.signInRequestPayload)
      .subscribe((data) => console.log('Log in successfully', data));
  }

  constructor(private authService: AuthService) {
    this.signInRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
