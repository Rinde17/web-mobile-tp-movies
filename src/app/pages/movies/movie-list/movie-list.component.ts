import {CommonModule} from '@angular/common';
import {delay, takeUntil} from 'rxjs/operators';
import {Store, select} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {IMovie} from 'src/app/interfaces/movie';
import {
    TmdbService,
    TMDB_SORTING_OPTIONS,
    TMDB_YEARS_OPTIONS,
    TMDB_GENRE_OPTIONS,
} from 'src/app/services/tmdb/tmdb.service';
import {DataStorageService} from 'src/app/services/data-storage/data-storage.service';
import {IUser} from 'src/app/interfaces/user';
import {AuthService} from 'src/app/services/auth/auth.service';
import {IMovieDetailsState} from '../movie-store';
import * as movieActions from '../movie-store/movie.actions';
import {selectMovies, selectError} from '../movie-store/movie.selectors';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'web-mobile-tp-movies-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
    length: any;
    searchResults: any;
    searchString = '';
    movies: any;
    currentUser: IUser | null = null;
    movies$: Observable<IMovie[]> = this._store.pipe(select(selectMovies));
    errorMessage$: Observable<string> | undefined;
    destroyed$: Subject<boolean> = new Subject<boolean>();
    filterSettings = {
        sort_by: TMDB_SORTING_OPTIONS[0].value.toString(),
        primary_release_year: TMDB_YEARS_OPTIONS[0].value.toString(),
        with_genres: TMDB_GENRE_OPTIONS[0].value.toString(),
    };

    constructor(
        private _tmdbService: TmdbService,
        private _dataStorageService: DataStorageService,
        private _authService: AuthService,
        private _store: Store<IMovieDetailsState>
    ) {
    }

    ngOnInit(): void {
        this._store.dispatch(
            movieActions.loadMovies({filters: this.filterSettings})
        );

        this.getTopRatedMovies(1)

        this._authService.userState
            .pipe(takeUntil(this.destroyed$))
            .subscribe((user) => {
                this.currentUser = user;
            });

        this.errorMessage$ = this._store.pipe(select(selectError));
    }

    onGenreChanged(genre: string): void {
        this.filterSettings = {...this.filterSettings, with_genres: genre};
        this._store.dispatch(
            movieActions.loadMovies({filters: this.filterSettings})
        );
    }

    onYearChanged(releaseDate: string): void {
        this.filterSettings = {
            ...this.filterSettings,
            primary_release_year: releaseDate,
        };
        this._store.dispatch(
            movieActions.loadMovies({filters: this.filterSettings})
        );
    }

    onSortByChanged(sortBy: string): void {
        this.filterSettings = {...this.filterSettings, sort_by: sortBy};
        this._store.dispatch(
            movieActions.loadMovies({filters: this.filterSettings})
        );
    }

    addToWatchlist(movie: IMovie): void {
        if (this.currentUser && this.currentUser.email) {
            this._dataStorageService.addMediaToWatchlist(
                movie,
                this.currentUser.email,
                (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Ajouté à la liste des films à voir');
                    }
                }
            );
        }
    }

    addToFavorites(movie: IMovie): void {
        if (this.currentUser && this.currentUser.email) {
            this._dataStorageService.addMediaToFavorite(
                movie,
                this.currentUser.email,
                (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Ajouté à la liste des films favoris');
                    }
                }
            );
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    searchMovies(page: number): void {
        this._tmdbService.searchMovie(this.searchString, page).subscribe((data: any) => {
            this.searchResults = data.results;
            this.length = data.total_results;
        });
    }
    getTopRatedMovies(page: number): void {
        this._tmdbService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((data: any) => {
                this.movies = data.results;
                this.length = data.total_results;
            }
        );
    }
    changePageSearch(event: { pageIndex: number; }) {
        this.searchMovies(event.pageIndex + 1)
    }

}
