import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userState: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    this._angularFireAuth.authState.subscribe((user) => {
      this.userState.next(user);
    });
  }

  logOut(): void {
    this._angularFireAuth
      .signOut()
      .then(() => {
        console.log('logged out!');
      })
      .catch((error) => {
        console.log('error');
      });
  }

  loginWithEmailAndPassword(
    credentials: { email: string; password: string },
    callback: (error?: any) => void
  ) {
    return this._angularFireAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        console.log(credentials);
        callback();
      })
      .catch((error) => {
        callback(error);
      });
  }

  registerWithEmailAndPassword(
    credentials: { email: string; password: string },
    callback: (error?: any) => void
  ) {
    return this._angularFireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        console.log(credentials);
        callback();
      })
      .catch((error) => {
        callback(error);
      });
  }

  // private updateUserInfo({ uid, displayName, email, photoURL }: firebase.User) {
  //   return (
  //     this.angularFirestore
  //       .doc(`/Users/${uid}`)
  //       // Set by default overrides the whole object.
  //       .set(
  //         {
  //           uid,
  //           displayName,
  //           email,
  //           photoURL,
  //         },
  //         {
  //           merge: true,
  //         }
  //       )
  //   );
  // }
}
