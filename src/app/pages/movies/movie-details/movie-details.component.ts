import { Component, OnInit } from '@angular/core';
import { IMovie, IMovieCredits } from 'src/app/interfaces/movie';
import {ActivatedRoute, Router} from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'web-mobile-tp-movies-app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: IMovie | undefined;
  movieCredits: IMovieCredits | undefined;
  routeParameterId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _tmdbService: TmdbService,
    private _router: Router
  ) {
    this.routeParameterId = this._activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this._tmdbService.movie(this.routeParameterId).subscribe((response) => {
      this.movie = response;
    });

    this._tmdbService.movieCredits(this.routeParameterId).subscribe((response) => {
      this.movieCredits = response;
    });
  }

  redirect(actorId: number): void {
    this._router.navigate(['/people', actorId]);
  }
}
