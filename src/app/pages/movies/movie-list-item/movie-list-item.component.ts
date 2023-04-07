import {CommonModule} from '@angular/common';
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {IMovie} from 'src/app/interfaces/movie';
import {Router} from '@angular/router';
import {faList, faHeart} from '@fortawesome/free-solid-svg-icons';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from 'src/app/services/auth/auth.service';
import {IUser} from 'src/app/interfaces/user';
import {Subject} from 'rxjs';
import {DataStorageService} from "../../../services/data-storage/data-storage.service";

@Component({
    selector: 'web-mobile-tp-movies-movie-list-item',
    templateUrl: './movie-list-item.component.html',
    styleUrls: ['./movie-list-item.component.scss'],
})
export class MovieListItemComponent implements OnInit {
  @Input() movie: IMovie;
  @Input() public currentRating: number;
  @Output() addedToWatchlist = new EventEmitter<IMovie>();
  @Output() addedToFavorite = new EventEmitter<IMovie>();

  faList = faList;
  faHeart = faHeart;
  currentUser: IUser;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.userState
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => (this.currentUser = response));
    this.currentRating = this.movie.vote_average;
  }

  redirect(): void {
    this._router.navigate(['/movies', this.movie.id]);
  }

  addToWatchlist(): void {
    this.addedToWatchlist.emit(this.movie);
  }

  addToFavorite(): void {
    this.addedToFavorite.emit(this.movie);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
