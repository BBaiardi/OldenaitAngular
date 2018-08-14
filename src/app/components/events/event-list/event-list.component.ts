import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { Event } from '../../../core/models/event';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events$: Observable<Event[]>;

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.events$ = this.eventService.getData();
  }

}
