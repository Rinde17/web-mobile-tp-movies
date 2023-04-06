import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { DataStorageService } from '../../../services/data-storage/data-storage.service';
import { takeUntil } from 'rxjs/operators';
import { getAuth } from '@angular/fire/auth';
import { IWatchList } from '../../../interfaces/watchlist';
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'web-mobile-tp-movies-profile-watchlist',
  templateUrl: './profile-watchlist.component.html',
  styleUrls: ['./profile-watchlist.component.scss'],
})
export class ProfileWatchlistComponent {

  faDelete = faTrashAlt;
  authUser = getAuth().currentUser;
  watchList: IWatchList[] = this._dataStorageService.getWatchList(
    this.authUser?.email
  );
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _authService: AuthService,
    private _dataStorageService: DataStorageService
  ) {}
  ngOnInit(): void {
    this._authService.userState
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        const authUser = getAuth().currentUser;
      });
  }

  deleteWatchlist(id: number): void {
    this.watchList =
        this._dataStorageService.getWatchList(this.authUser?.email);
    this._dataStorageService.deleteWatchList(this.authUser?.email, id);
  }

  protected readonly faTrashAlt = faTrashAlt;
}
