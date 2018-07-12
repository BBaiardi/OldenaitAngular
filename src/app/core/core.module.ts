import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../core/auth.service';
import { EventService} from '../core/event.service';

@NgModule({
  providers: [AuthService, EventService]
})
export class CoreModule { }
