import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as authActions from './auth-store/auth.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IAuthState } from './auth-store';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'web-mobile-tp-movies-app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.components.scss'],
})
export class AuthComponent implements OnInit {
  authSwitch = 'login';
  loginForm: FormGroup | undefined;
  registerForm: FormGroup | undefined;
  loginFormError = '';
  registerFormError = '';
  file: File | null = null;
  trigger: Subject<any> = new Subject();
  webcamImage!: WebcamImage;
  nextWebcam: Subject<any> = new Subject();
  captureImage = '';

  usePhoto = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _angularFireAuth: AngularFireAuth,
    private _store: Store<IAuthState>
  ) {}

  logInWithGoogle(): void {
    this._angularFireAuth.authState.subscribe((r) => console.log(r));
    this._store.dispatch(authActions.logInWithOauth({ provider: 'google' }));
  }

  onSubmitLoginForm(): void {
    if (this.loginForm) {
      this._authService.loginWithEmailAndPassword(
        this.loginForm.value,
        (error) => {
          if (error) {
            this.loginFormError = error;
          } else {
            this._router.navigate(['/movies']);
          }
        }
      );
    }
  }

  onSubmitRegisterForm(): void {
    if (this.registerForm) {
      this._authService.registerWithEmailAndPassword(
        this.registerForm.value,
        this.file,
        this.usePhoto,
        this.captureImage,
        (error) => {
          if (error) {
            this.registerFormError = error;
          } else {
            this._router.navigate(['/movies']);
          }
        }
      );
    }
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const files = target.files as FileList;
    this.file = files[0];
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.registerForm = new FormGroup({
      last_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      first_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  triggerSnapshot(): void {
    this.trigger.next(false);
  }

  handleImage(webCamImage: WebcamImage): void {
    this.webcamImage = webCamImage;
    this.captureImage = webCamImage?.imageAsDataUrl;
  }

  triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  switchUsePhoto(use: boolean) {
    this.usePhoto = use;
  }
}
