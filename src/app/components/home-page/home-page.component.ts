import { Component, OnInit } from '@angular/core';
// For MDB Angular Free
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { Event } from '../../core/models/event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  events: Event[];

  constructor() { }

  ngOnInit() {
  }

}
