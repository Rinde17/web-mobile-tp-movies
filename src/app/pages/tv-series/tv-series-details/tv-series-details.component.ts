import {Component} from '@angular/core';
import { ITvSerie } from 'src/app/interfaces/tvseries';
import {ActivatedRoute, Router} from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import {ITvCredit} from "../../../interfaces/tvcredits";

@Component({
  selector: 'web-mobile-tp-movies-tv-series-details',
  templateUrl: './tv-series-details.component.html',
  styleUrls: ['./tv-series-details.component.scss'],
})
export class TvSeriesDetailsComponent {
  tvshow: ITvSerie | undefined;
  tvcredits: ITvCredit | undefined;
  routeParameterId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _tmdbService: TmdbService,
    private _router: Router
  ) {
    this.routeParameterId = this._activatedRoute.snapshot.params['id'];

    this._tmdbService.tvseries(this.routeParameterId).subscribe((response) => {
      this.tvshow = response;
    });

    this._tmdbService.tvcredits(this.routeParameterId).subscribe((response) => {
      this.tvcredits = response;
    });
  }

  redirect(actorId: number): void {
    this._router.navigate(['/people', actorId]);
  }
}
