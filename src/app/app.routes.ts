import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'tv-series',
    loadChildren: () =>
      import('./pages/tv-series/tv-series.module').then(
        (m) => m.TvSeriesModule
      ),
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./pages/people/people.module').then((m) => m.PeopleModule),
  },
];
