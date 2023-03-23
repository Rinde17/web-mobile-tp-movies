import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ITvSerie } from 'src/app/interfaces/tvseries';
import {
  TmdbService,
  TMDB_SORTING_OPTIONS,
  TMDB_YEARS_OPTIONS,
  TMDB_GENRE_OPTIONS,
} from 'src/app/services/tmdb/tmdb.service';
import { Store, select } from '@ngrx/store';
import { ITvShowsState } from '../tv-series-store';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import {
  selectTvShow,
  selectError,
} from '../tv-series-store/tv-series.selectors';
import * as tvShowActions from '../tv-series-store/tv-series.actions';

@Component({
  selector: 'web-mobile-tp-movies-tv-series-list',
  templateUrl: './tv-series-list.component.html',
  styleUrls: ['./tv-series-list.component.scss'],
})
export class TvSeriesListComponent implements OnInit {
  tvseries$: Observable<ITvSerie[]> = this._store.pipe(select(selectTvShow));
  errorMessage$: Observable<string> | undefined;
  currentUser: IUser | null = null;
  searchText = '';

  destroyed$: Subject<boolean> = new Subject<boolean>();

  filterSettings = {
    sort_by: TMDB_SORTING_OPTIONS[0].value.toString(),
    first_air_date: TMDB_YEARS_OPTIONS[0].value.toString(),
    with_genres: TMDB_GENRE_OPTIONS[0].value.toString(),
  };

  constructor(
    private _tmdbService: TmdbService,
    private _store: Store<ITvShowsState>,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTvShows();

    this._authService.userState
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.currentUser = user;
      });
    this.errorMessage$ = this._store.pipe(select(selectError));
  }

  onGenreChanged(genre: string): void {
    this.filterSettings = { ...this.filterSettings, with_genres: genre };
    this.getTvShows();
  }

  onSortByChanged(sortBy: string): void {
    this.filterSettings = { ...this.filterSettings, sort_by: sortBy };
    this.getTvShows();
  }

  onYearChanged(airDate: string): void {
    this.filterSettings = { ...this.filterSettings, first_air_date: airDate };
    this.getTvShows();
  }

  getTvShows() {
    this._store.dispatch(
      tvShowActions.loadShows({ filters: this.filterSettings })
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
