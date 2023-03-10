import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPerson } from 'src/app/interfaces/person';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getAuth } from '@angular/fire/auth';
import { getUser } from '../../auth/auth-store/auth.actions';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'cypress/types/bluebird';

@Component({
  selector: 'web-mobile-tp-movies-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent implements OnInit {
    infos: AngularFirestoreDocument<any>;
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
          this.infos = this._dataStorageService.getInfos(authUser?.email).snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({ first_name: c.payload.doc.data() })
                )    
            )
          ).subscribe();
        });

        console.log(this.infos);
    }
}
