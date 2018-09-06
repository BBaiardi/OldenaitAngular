import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { Event } from '../../../core/models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events$: Observable<Event[]>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.events$ = this.eventService.getData();
  }


}
