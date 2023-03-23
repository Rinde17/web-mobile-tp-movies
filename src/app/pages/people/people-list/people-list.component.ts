import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPerson } from 'src/app/interfaces/person';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Store, select } from '@ngrx/store';
import { IPeopleState } from '../people-store';
import * as peopleActions from '../people-store/people.actions';
import { Observable } from 'rxjs';
import { selectPeople, selectError } from '../people-store/people.selectors';

@Component({
  selector: 'web-mobile-tp-movies-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  people$: Observable<IPerson[]> | undefined;
  errorMessage$: Observable<string> | undefined;

  searchText = '';

  constructor(
    private _tmdbService: TmdbService,
    private _store: Store<IPeopleState>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(peopleActions.loadPeople({ filters: null }));
    this.people$ = this._store.pipe(select(selectPeople));
    this.errorMessage$ = this._store.pipe(select(selectError));
  }
}
