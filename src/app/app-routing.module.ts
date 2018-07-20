import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'eventos', component: EventsComponent },
  { path: 'mapa', component: GoogleMapsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'perfil',
    component: UserProfileComponent,
    canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
