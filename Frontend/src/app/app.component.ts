import { CountriesService } from './services/countries.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Frontend';
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      switchMap((value) => this.countriesService.getCountries(value || ''))
    );
  }
}
