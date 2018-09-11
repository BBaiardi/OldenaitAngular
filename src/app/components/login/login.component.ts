import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userSignInForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  // Social Login

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    return await this.afterSignIn();
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  // Email-password Login

  async login() {
    await this.auth.emailLogin(this.userSignInForm.value['email'], this.userSignInForm.value['password']);
    return await this.afterSignIn();
  }

  private afterSignIn() {
    return this.router.navigate(['/']);
  }

  createForm() {
    this.userSignInForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
    ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8),
        Validators.maxLength(25)
      ]]
    });
  }

  get email() {
    return this.userSignInForm.get('email');
  }

  get password() {
    return this.userSignInForm.get('password');
  }

}
