import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../../core/models/event';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event$: Observable<Event[]>;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe( params => {
      this.event$ = this.eventService.getEvent(params['id']).valueChanges();
    });
  }

}
