import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { AuthService } from '../../services/auth/auth.service';
import { select, Store } from '@ngrx/store';
import { IMovieState } from '../movies/movie-store';
import { IMovie } from '../../interfaces/movie';
import { IUser } from '../../interfaces/user';
import * as movieActions from '../movies/movie-store/movie.actions';
import { first, takeUntil } from 'rxjs/operators';
import {
  selectError,
  selectMovies,
} from '../movies/movie-store/movie.selectors';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'web-mobile-tp-movies-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listFavoris: any[];
  currentUser: IUser;
  destroyed$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private _dataStorageService: DataStorageService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.userState
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.currentUser = user;
        this.listFavoris = this._dataStorageService.getFavorites(user?.uid);
      });
  }
}
