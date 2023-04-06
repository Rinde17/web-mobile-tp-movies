import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITvSerie } from '../../../interfaces/tvseries';
import { Router } from '@angular/router';
import {IMovie} from "../../../interfaces/movie";
import {IUser} from "../../../interfaces/user";
import {faList, faHeart} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth/auth.service";
import {DataStorageService} from "../../../services/data-storage/data-storage.service";


@Component({
  selector: 'web-mobile-tp-movies-tv-series-list-item',
  templateUrl: './tv-series-list-item.component.html',
  styleUrls: ['./tv-series-list-item.component.scss'],
})
export class TvSeriesListItemComponent {
  @Input() tvshow: ITvSerie | any;
  @Output() addedToWatchlist = new EventEmitter<ITvSerie>();
  @Output() addedToFavorite = new EventEmitter<ITvSerie>();
  faList = faList;
  faHeart = faHeart;
  currentUser: IUser | null = null;

  constructor(
      private _router: Router,
      private _authService: AuthService,
      private _dataStorageService: DataStorageService,
  ) {
  }
  redirect(): void {
    this._router.navigate(['/tv-series', this.tvshow.id]);
  }

  addToWatchlist(): void {
    this.addedToWatchlist.emit(this.tvshow);
  }

  addToFavorite(): void {
    this.addedToFavorite.emit(this.tvshow);
  }
}
