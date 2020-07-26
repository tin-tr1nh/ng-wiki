import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FinishSignUpComponent } from './finish-sign-up/finish-sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {path: 'sign-up', component: SignupComponent},
  {path: 'finish-sign-up', component: FinishSignUpComponent},
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
