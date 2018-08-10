import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../core/models/event';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  private EventDoc: AngularFirestoreDocument<Event>;
  event$: Observable<Event>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.EventDoc = this.afs.doc<Event>('event/64UrRNPxNl2eTi6V1aAv');
    this.event$ = this.EventDoc.valueChanges();
  }

}
