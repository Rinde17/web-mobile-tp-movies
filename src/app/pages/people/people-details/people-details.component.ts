import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { IPersonCredit } from '../../../interfaces/response';
import { IPersonDetails } from '../../../interfaces/person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-mobile-tp-movies-app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss'],
})
export class PeopleDetailsComponent implements OnInit {
  person: IPersonDetails | undefined;
  routerParameterId: number;

  credits: {
    cast: IPersonCredit[];
    crew: IPersonCredit[];
  } = {
    cast: [],
    crew: [],
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _tmdbService: TmdbService,
    private _router: Router
  ) {
    this.routerParameterId = _activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._tmdbService
      .personDetails(this.routerParameterId)
      .subscribe((response) => {
        this.person = response;
      });

    this._tmdbService
      .personCombinedCredits(this.routerParameterId)
      .subscribe((response) => {
        this.credits = {
          cast: response.cast,
          crew: response.crew,
        };
      });
  }

  redirectToMedia(mediaType: string, castId: number): void {
    const route = mediaType === 'movie' ? '/movies' : '/tv-shows';
    this._router.navigate([route, castId]);
  }
}
