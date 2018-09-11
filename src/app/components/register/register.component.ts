import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      displayName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8)
      ]]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  public async signUp() {
    return await this.auth.emailSignUp(
      this.registerForm.value['displayName'],
      this.registerForm.value['email'],
      this.registerForm.value['password']
    )
    .then(this.router.navigate['/auth']);
  }

}
