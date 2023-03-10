import { Component } from '@angular/core';
import { ITvSerie } from 'src/app/interfaces/tvseries';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'web-mobile-tp-movies-tv-series-details',
  templateUrl: './tv-series-details.component.html',
  styleUrls: ['./tv-series-details.component.scss'],
})
export class TvSeriesDetailsComponent {
  tvshow: ITvSerie;
  routeParameterId: number;
  thenBlock: any;
  elseBlock: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _tmdbService: TmdbService
  ) {
    this.routeParameterId = this._activatedRoute.snapshot.params.id;

    this._tmdbService.tvseries(this.routeParameterId).subscribe((response) => {
      this.tvshow = response;
    });
  }
}
