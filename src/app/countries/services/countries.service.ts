import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';

import { Country } from '../interfaces/countries';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl = 'https://restcountries.com/v3.1';


    constructor(private httpClient: HttpClient) { }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {

        const url = `${this.apiUrl}/alpha/${code}`;

        return this.httpClient.get<Country[]>(url)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(error => {
                    console.error('Error searching by alpha code:', error);
                    return of(null);
                })
            );
    }
    searchCapital(term: string): Observable<Country[]> {

        const url = `${this.apiUrl}/capital/${term}`;

        return this.httpClient.get<Country[]>(url)
            .pipe(
                catchError(error => {
                    console.error('Error searching by capital:', error);
                    return of([]);
                })
            );
    }
    
    searchCountry(term: string): Observable<Country[]> {

        const url = `${this.apiUrl}/name/${term}`;

        return this.httpClient.get<Country[]>(url)
            .pipe(
                catchError(error => {
                    console.error('Error searching by country:', error);
                    return of([]);
                })
            );
    }

    searchRegion(region: string): Observable<Country[]> {

        const url = `${this.apiUrl}/region/${region}`;

        return this.httpClient.get<Country[]>(url)
            .pipe(
                catchError(error => {
                    console.error('Error searching by region:', error);
                    return of([]);
                })
            );
    }
}