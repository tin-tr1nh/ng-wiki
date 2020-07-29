import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpRequestPayload } from './sign-up-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpFormGroup: FormGroup;
  signUpPayload: SignUpRequestPayload;

  constructor(private authService: AuthService,
  private router: Router,
  private toastService: ToastrService) {
    this.signUpPayload = {
      email: '',
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    this.signUpPayload.email = this.signUpFormGroup.get('email').value;
    this.signUpPayload.username = this.signUpFormGroup.get('username').value;
    this.signUpPayload.password = this.signUpFormGroup.get('password').value;

    this.authService
      .signUp(this.signUpPayload)
      .subscribe(
        (data) => this.router.navigate(['/finish-sign-up'], {queryParams: {registered: 'true'}}),
        () => this.toastService.error("Failed to sign up"));
  }
}
