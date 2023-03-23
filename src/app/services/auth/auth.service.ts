import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userState: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
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
        // console.log(credentials);
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
      url_picture: string;
      password: string;
    },
    callback: (error?: any) => void
  ) {
    return this._angularFireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        if (response.user) {
          this.addToFirestore(
            credentials.email,
            credentials.last_name,
            credentials.first_name,
            credentials.url_picture,
            response.user.uid
          );
        }
        callback();
      })
      .catch((error) => {
        callback(error);
      });
  }

  addToFirestore(
    email: string,
    last_name: string,
    first_name: string,
    url_picture: string,
    uid: string
  ) {
    const data = {
      email: email,
      last_name: last_name,
      first_name: first_name,
      url_picture: url_picture,
      uid: uid,
    };

    this.angularFirestore
      .collection('Users')
      .doc(`${email}`)
      .set(data)
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
  }

  getInfos(userEmail: string | null) {
    const infosProfile = {
      email: '',
      last_name: '',
      first_name: '',
      url_picture: '',
      uid: '',
    };
    this.angularFirestore
      .doc(`Users/${userEmail}`)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot) {
          infosProfile.email = querySnapshot.get('email');
          infosProfile.last_name = querySnapshot.get('last_name');
          infosProfile.first_name = querySnapshot.get('first_name');
          infosProfile.url_picture = querySnapshot.get('url_picture');
          infosProfile.uid = querySnapshot.get('uid');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return infosProfile;
  }
}
