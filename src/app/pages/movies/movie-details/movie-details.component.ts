import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'web-mobile-tp-movies-app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movies: IMovie;
  routeParameterId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _tmdbService: TmdbService
  ) {
    this.routeParameterId = _activatedRoute.snapshot.params.id;
  }
  ngOnInit(): void {
    this._tmdbService.movie(this.routeParameterId).subscribe((response) => {
      this.movies = response;
    });
  }
}
