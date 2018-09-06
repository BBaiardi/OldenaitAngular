import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  name = new FormControl('');

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }




}
