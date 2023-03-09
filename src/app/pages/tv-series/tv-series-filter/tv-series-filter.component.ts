import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'web-mobile-tp-movies-tv-series-filter',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tv-series-filter.component.html',
  styleUrls: ['./tv-series-filter.component.scss'],
})
export class TvSeriesFilterComponent {}
