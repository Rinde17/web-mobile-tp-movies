import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IMovie } from 'src/app/interfaces/movie';
import { ITvSerie } from 'src/app/interfaces/tvseries';
import { isMovieTypeGuard } from 'src/app/interfaces/person';
import { IFirestoreMedia } from 'src/app/interfaces/firestore';
import { data } from 'cypress/types/jquery';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  addMediaToWatchlist(
    media: IMovie | ITvSerie,
    userEmail: string,
    callback: (error?: string) => void
  ): void {
    const mediaDetails: IFirestoreMedia = {
      id: media.id,
      createdAt: new Date(),
      title: isMovieTypeGuard(media) ? media.title : media.original_name,
      posterPath: media.poster_path,
      isWatched: false,
      mediaType: isMovieTypeGuard(media) ? 'movie' : 'tv-show',
    };

    this.angularFirestore
      .doc(`Lists/${userEmail}`)
      .collection<IFirestoreMedia[]>('watchlist')
      .doc<IFirestoreMedia>(`${media.id}`)
      .set(mediaDetails)
      .then((success) => callback())
      .catch((error) => callback(error));
  }

  addMediaToFavorite(
    media: IMovie | ITvSerie,
    userEmail: string,
    callback: (error?: string) => void
  ): void {
    const mediaDetails: IFirestoreMedia = {
      id: media.id,
      createdAt: new Date(),
      title: isMovieTypeGuard(media) ? media.title : media.original_name,
      posterPath: media.poster_path,
      isWatched: false,
      mediaType: isMovieTypeGuard(media) ? 'movie' : 'tv-show',
    };

    this.angularFirestore
      .doc(`Lists/${userEmail}`)
      .collection<IFirestoreMedia[]>('favorite')
      .doc<IFirestoreMedia>(`${media.id}`)
      .set(mediaDetails)
      .then((success) => callback())
      .catch((error) => callback(error));
  }

  getFavorites(userEmail: string) {
    const listFavorites = [];
    this.angularFirestore
      .collection(`Lists/${userEmail}/favorite`)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          listFavorites.push(doc.data());
          console.log(listFavorites);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return listFavorites;
  }

  // getInfos(userEmail: string) {
  //   const infosProfile = {
  //     last_name: '',
  //     first_name: '',
  //   };
  //   this.angularFirestore
  //     .doc(`Lists/${userEmail}`)
  //     .get()
  //     .toPromise()
  //     .then((querySnapshot) => {
  //       // querySnapshot.docs.forEach((doc) => {
  //       //   infosProfile.push(doc.data());
  //       //   console.log(infosProfile);
  //       // });
  //       infosProfile.last_name = querySnapshot.get('last_name');
  //       infosProfile.first_name = querySnapshot.get('first_name');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   return infosProfile;
  // }

  getInfos(userEmail: string) {
    return this.angularFirestore.firestore.doc(`Lists/${userEmail}`).get();
  }
}
