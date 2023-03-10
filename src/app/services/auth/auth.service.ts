import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IFirestoreMedia } from '../../interfaces/firestore';

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
    credentials: {
      last_name: string;
      first_name: string;
      email: string;
      password: string;
    },
    callback: (error?: any) => void
  ) {
    this.addToFirestore(
      credentials.email,
      credentials.last_name,
      credentials.first_name
    );
    return this._angularFireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        callback();
      })
      .catch((error) => {
        callback(error);
      });
  }

  addToFirestore(email, last_name, first_name) {
    const data = {
      last_name: last_name,
      first_name: first_name,
    };

    this.angularFirestore
      .collection('Lists')
      .doc(`${email}`)
      .set(data)
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
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
  getInfos(userEmail: string) {
    const infosProfile = {
      last_name: '',
      first_name: '',
    };
    this.angularFirestore
      .doc(`Lists/${userEmail}`)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        infosProfile.last_name = querySnapshot.get('last_name');
        infosProfile.first_name = querySnapshot.get('first_name');
      })
      .catch((err) => {
        console.log(err);
      });
    return infosProfile;
  }
}
