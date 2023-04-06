import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from '@angular/router';
import {IUser} from './interfaces/user';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IAuthState} from './pages/auth/auth-store';
import * as authActions from './pages/auth/auth-store/auth.actions';

@Component({
    selector: 'web-mobile-tp-movies-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isShown = false;
    infosProfile: {
        first_name: string;
        last_name: string;
        email: string;
    } = {
        first_name: '',
        last_name: '',
        email: '',
    };
    destroyed$: Subject<boolean> = new Subject<boolean>();
    user: IUser | null = null;


    constructor(
        private _authService: AuthService,
        private _router: Router,
        private store: Store<IAuthState>
    ) {
    }

    logOut(): void {
        this.store.dispatch(authActions.logOut());
        this._router.navigate(['/auth']);
    }
  ngOnInit() {
    this._authService.userState
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        console.log(response);
        this.user = response;
        this.infosProfile = this._authService.getInfos(response?.email);
      });
  }

    logIn(): void {
        this._router.navigate(['/auth']);
    }

    profile(): void {
        this._router.navigate(['/profile']);
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
