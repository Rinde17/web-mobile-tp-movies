import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, finalize, Observable, takeLast } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, ref } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat';
import User = firebase.User;

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
      password: string;
    },
    file: File | null,
    usePhoto: boolean,
    captureImage: string,
    callback: (error?: any) => void
  ) {
    return this._angularFireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        if (response.user) {
          if (usePhoto) {
            console.log(captureImage);
            this.addToFireStorageCapture(captureImage, response.user);
          }
          if (file !== null) {
            this.addToFireStorageFile(file, response.user);
          }

          this.addToFirestore(
            credentials.email,
            credentials.last_name,
            credentials.first_name,
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
    uid: string
  ) {
    const data = {
      email: email,
      last_name: last_name,
      first_name: first_name,
      uid: uid,
    };

    this.angularFirestore
      .collection('Users')
      .doc(`${email}`)
      .set(data)
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
  }

  addToFireStorageFile(file: File, user: User) {
    const filePath = '/uploads/' + user.uid + '/' + file.name;
    const storageRef = this.angularFireStorage.ref(filePath);
    const uploadTask = this.angularFireStorage.upload(filePath, file);

    uploadTask
      .snapshotChanges()
      .pipe(
        takeLast(1),
        switchMap(() => {
          return storageRef.getDownloadURL();
        })
      )
      .subscribe((downladURL) => {
        user.updateProfile({
          photoURL: downladURL,
        });
      });
  }

  addToFireStorageCapture(capture: string, user: User) {
    const filePath = '/uploads/' + user.uid + '/';
    const storageRef = this.angularFireStorage.ref(filePath);
    const putStringTask = storageRef.putString(capture, 'data_url');
    // const putStringTask = storageRef.put(capture.toString());

    putStringTask
      .snapshotChanges()
      .pipe(
        takeLast(1),
        switchMap(() => {
          return storageRef.getDownloadURL();
        })
      )
      .subscribe((dowloadURL) => {
        console.log(dowloadURL);
        user.updateProfile({
          photoURL: dowloadURL,
        });
      });
  }

  getInfos(userEmail: string | null | undefined) {
    const infosProfile = {
      email: '',
      last_name: '',
      first_name: '',
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
          infosProfile.uid = querySnapshot.get('uid');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return infosProfile;
  }
}
