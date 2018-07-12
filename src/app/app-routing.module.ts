import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';

const routes: Routes = [
  { path: 'event', component: EventsComponent },
  { path: 'map', component: GoogleMapsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
