import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AuthService} from '../auth/auth.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {IMovie} from 'src/app/interfaces/movie';
import {ITvSerie} from 'src/app/interfaces/tvseries';
import {isMovieTypeGuard} from 'src/app/interfaces/person';
import {IFirestoreMedia} from 'src/app/interfaces/firestore';
import 'firebase/firestore';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {IWatchList} from '../../interfaces/watchlist';
import firebase from 'firebase/compat';
import {IFavori} from '../../interfaces/favori';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private angularFireAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private angularFirestore: AngularFirestore
    ) {
    }

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
            .doc(`Users/${userEmail}`)
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
            .doc(`Users/${userEmail}`)
            .collection<IFirestoreMedia[]>('favorite')
            .doc<IFirestoreMedia>(`${media.id}`)
            .set(mediaDetails)
            .then((success) => callback())
            .catch((error) => callback(error));
    }

    getFavorites(userEmail: string | null | undefined) {
        const listFavorites: IFavori[] = [];
        this.angularFirestore
            .collection(`Users/${userEmail}/favorite`)
            .get()
            .toPromise()
            .then((querySnapshot) => {
                if (querySnapshot) {
                    querySnapshot.docs.forEach((doc) => {
                        if (doc.data()) {
                            listFavorites.push(<IFavori>doc.data());
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return listFavorites;
    }

    getWatchList(userEmail: string | null | undefined) {
        const watchList: IWatchList[] = [];
        this.angularFirestore
            .collection(`Users/${userEmail}/watchlist`)
            .get()
            .toPromise()
            .then((querySnapshot) => {
                if (querySnapshot) {
                    querySnapshot.docs.forEach((doc) => {
                        watchList.push(<IWatchList>doc.data());
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return watchList;
    }

    deleteFavorite(userEmail: string | null | undefined, id: number) {
        this.angularFirestore
            .collection(`Users/${userEmail}/favorite`)
            .doc(`${id}`)
            .delete()
            .then(() => {
                console.log('Document successfully deleted!');
            }).catch((error) => {
                console.error('Error removing document: ', error);

            }
        );
    }

    deleteWatchList(userEmail: string | null | undefined, id: number) {
        this.angularFirestore
            .collection(`Users/${userEmail}/watchlist`)
            .doc(`${id}`)
            .delete()
            .then(() => {
                console.log('Document successfully deleted!');
            }).catch((error) => {
                console.error('Error removing document: ', error);

            }
        );
    }

    isFavorite(userEmail: string | undefined, id: number) {
        this.angularFirestore
            .collection(`Users/${userEmail}/favorite`)
            .doc(`${id}`)
            .get()
            .toPromise()
            .then((doc: any) => {
                if (doc.exists) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
