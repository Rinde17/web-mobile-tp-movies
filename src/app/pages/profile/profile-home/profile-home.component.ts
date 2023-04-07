import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getAuth, updateEmail, updatePassword, user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as authActions from '../../auth/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { IAuthState } from '../../auth/auth-store';
import { Router } from '@angular/router';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'web-mobile-tp-movies-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent implements OnInit {
  infosProfile: {
    first_name: string;
    last_name: string;
    email: string;
  } = {
    first_name: '',
    last_name: '',
    email: '',
  };

  user: IUser | null | undefined;
  email: string | undefined;
  password = '';
  success: string | undefined;
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _authService: AuthService,
    private angularFirestore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private store: Store<IAuthState>
  ) {
    this._authService.userState.subscribe((user) => {
      this.email = user?.email;
      this.password = user?.password;
    });
  }

  ngOnInit(): void {
    this._authService.userState
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        this.user = response;
        this.infosProfile = this._authService.getInfos(response?.email);
      });
  }

  updateProfile() {
    this.angularFirestore
      .collection('Users')
      .doc(this.email)
      .update({
        first_name: this.infosProfile.first_name,
        last_name: this.infosProfile.last_name,
      })
      .then(() => {
        this.success = 'Données mises à jour';
        window.location.reload();
      });
  }

  updatePassword2(newPassword: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          this.store.dispatch(authActions.logOut());
          this._router.navigate(['/auth']);
          console.log('Password updated');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
