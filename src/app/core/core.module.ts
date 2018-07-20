import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../core/services/auth.service';
import { EventService} from '../core/services/event.service';

@NgModule({
  providers: [AuthService, EventService]
})
export class CoreModule { }
