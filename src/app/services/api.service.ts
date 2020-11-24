import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryInterface } from '../model/country';

const api = 'https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }
  async getCountriesInffo() {
       return await this.http.get<CountryInterface[]>(api)
  }
}
