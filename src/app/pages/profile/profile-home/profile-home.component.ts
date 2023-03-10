import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getAuth } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'web-mobile-tp-movies-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent implements OnInit {
  // infos: {
  //   last_name: string;
  //   first_name: string;
  // };

  infos: DocumentData;

  last_name: string;
  first_name: string;
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
        this.getInfos(authUser);
      });

    console.log(this.last_name);
  }
  // getLastName(authUser) {
  //   this._dataStorageService
  //     .getLastName(authUser?.email)
  //     .then(
  //       (data) =>
  //         (this.last_name = data.exists ? data.data().last_name : undefined)
  //     );
  // }

  getInfos(authUser) {
    this._dataStorageService
      .getInfos(authUser?.email)
      .then((data) => (this.infos = data.exists ? data.data() : undefined));
  }
}
