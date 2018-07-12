import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsCollection: AngularFirestoreCollection<Event>;
  events: Observable<Event[]>;

  constructor(private afs: AngularFirestore) {
    this.eventsCollection = this.afs.collection('events');
    this.events = this.eventsCollection.valueChanges();
   }

   getEvents() {
     return this.events;
   }
}
