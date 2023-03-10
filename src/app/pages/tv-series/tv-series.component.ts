import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'web-mobile-tp-movies-tv-series',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss'],
})
export class TvSeriesComponent {}
