import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getAuth } from '@angular/fire/auth';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';

@Component({
  selector: 'web-mobile-tp-movies-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
})
export class ProfileFavoritesComponent implements OnInit {
  listFavoris: any[];
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
        this.listFavoris = this._dataStorageService.getFavorites(
            authUser?.email
        );
      });
  }
}
