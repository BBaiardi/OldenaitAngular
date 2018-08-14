import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../core/services/auth.service';

@NgModule({
  providers: [AuthService]
})
export class CoreModule { }
