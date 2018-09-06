import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Event } from '../../core/models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsCollection: AngularFirestoreCollection<Event>;
  events$: Observable<Event[]>;
  eventDocument: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.eventsCollection = afs.collection<Event>('events');
   }

   getData(): Observable<Event[]> {
     return this.events$ = this.eventsCollection.snapshotChanges().pipe(
       map((actions) => {
         return actions.map((a) => {
           const data = a.payload.doc.data();
           return { id: a.payload.doc.id, ...data };
         });
       })
     );
   }

   // Mediante ID devuelve la referencia del doc en la base de datos
   getEvent(id: string) {
     return this.afs.doc<any>(`events/${id}`);
   }
}
