import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
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
    provider.addScope('email');
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
  public async emailSignUp(displayName: string, email: string, password: string) {
    await this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      this.updateUserData(credential.user);
    });
    /* return this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      this.updateUserData(credential.user);
      this.updateProfile(displayName, credential.user.photoURL);
    })
    .catch(err => {
      console.log(err);
    });*/
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
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl || null
    };
    return userRef.set(data, {merge: true});
  }

  public deleteUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return userRef.delete();
  }

  public async updateProfile(name: string, photoUrl: string): Promise<any> {
    return await this.afAuth.auth.currentUser.updateProfile({ displayName: name, photoURL: photoUrl});
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
