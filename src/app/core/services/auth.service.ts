import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // OAuth Methods //
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider: any) {
    return this.afAuth.auth
    .signInWithPopup(provider)
    .then(credential => {
      this.updateUserData(credential.user);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Email/Password Auth //
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      return this.updateUserData(credential.user);
    })
    .catch(err => {
      console.log(err);
    });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(credential => {
      return this.updateUserData(credential.user);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Registra data del usuario despues un logueo exitoso
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'Usuario sin nombre',
      photoUrl: user.photoUrl || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
