import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'web-mobile-tp-movies-movie-filters',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss'],
})
export class MovieFiltersComponent {}
