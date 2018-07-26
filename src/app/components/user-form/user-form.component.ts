import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  submitForm: FormGroup;

  constructor(public auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.submitForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
      ]]
    });
  }

  signUp() {
    this.auth.emailSignUp(this.submitForm.value['email'], this.submitForm.value['password']);
    return this.router.navigate(['/perfil']);
  }

  get email() {
    return this.submitForm.get('email');
  }

  get password() {
    return this.submitForm.get('password');
  }

}
