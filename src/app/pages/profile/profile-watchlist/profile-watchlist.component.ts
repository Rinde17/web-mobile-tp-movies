import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { DataStorageService } from '../../../services/data-storage/data-storage.service';
import { takeUntil } from 'rxjs/operators';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'web-mobile-tp-movies-profile-watchlist',
  templateUrl: './profile-watchlist.component.html',
  styleUrls: ['./profile-watchlist.component.scss'],
})
export class ProfileWatchlistComponent {
  watchList: any[];
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
        this.watchList = this._dataStorageService.getWatchList(authUser?.email);
      });
  }
}
