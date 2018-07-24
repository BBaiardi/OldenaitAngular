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

  userForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    return this.afterSignIn();
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return this.afterSignIn();
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
    return this.afterSignIn();
  }

  private afterSignIn() {
    return this.router.navigate(['/perfil']);
  }

  createForm() {
    this.userForm = this.fb.group({
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
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

}
