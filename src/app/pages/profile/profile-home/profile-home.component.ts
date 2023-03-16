import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'web-mobile-tp-movies-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent implements OnInit {
  infosProfile: any;
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
        this.infosProfile = this._authService.getInfos(authUser?.email);
      });
  }
}
//
