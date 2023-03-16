import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'web-mobile-tp-movies-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listFavoris: any[];
  destroyed$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private _dataStorageService: DataStorageService,
    private _authService: AuthService
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
