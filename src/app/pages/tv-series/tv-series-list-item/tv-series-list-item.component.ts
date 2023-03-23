import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITvSerie } from '../../../interfaces/tvseries';
import { Router } from '@angular/router';

@Component({
  selector: 'web-mobile-tp-movies-tv-series-list-item',
  templateUrl: './tv-series-list-item.component.html',
  styleUrls: ['./tv-series-list-item.component.scss'],
})
export class TvSeriesListItemComponent {
  @Input() tvshow: ITvSerie | any;

  constructor(private _router: Router) {}

  redirect(): void {
    this._router.navigate(['/tv-series', this.tvshow.id]);
  }
}
