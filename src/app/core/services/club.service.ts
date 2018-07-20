import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Club } from '../models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  clubCollection: AngularFirestoreCollection<Club>;
  clubs: Observable<Club[]>;

  constructor(private afs: AngularFirestore) {
    this.clubCollection = this.afs.collection('clubs');
    this.clubs = this.clubCollection.valueChanges();
   }

   getClubs() {
     return this.clubs;
   }
}
