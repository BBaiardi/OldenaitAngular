import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventDetailComponent } from './components/events/event-detail/event-detail.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'eventos', component: EventListComponent },
  { path: 'evento/:id', component: EventDetailComponent },
  { path: 'mapa', component: GoogleMapsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: UserFormComponent },
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
