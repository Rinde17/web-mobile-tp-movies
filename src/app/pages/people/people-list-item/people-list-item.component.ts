import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IPerson, isMovieTypeGuard } from 'src/app/interfaces/person';
import { Router } from '@angular/router';

@Component({
  selector: 'web-mobile-tp-movies-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrls: ['./people-list-item.component.scss'],
})
export class PeopleListItemComponent implements OnInit {
  @Input() person: IPerson | undefined;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.formattedKnownFor();
  }

  // Iterate thru the known for property and check if it's movie or a tv show so we can display it without errors.
  formattedKnownFor() {
    if (this.person) {
      return this.person.known_for
        .map((item) => {
          return isMovieTypeGuard(item) ? item.title : item.name;
        })
        .join(', ');
    }
    return null;
  }

  redirect(): void {
    if (this.person) {
      this._router.navigate(['/people', this.person.id]);
    }
    this._router.navigate(['/home']);
  }
}
