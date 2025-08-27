import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contest, CountryMap } from '../../models/contest';

@Injectable({
  providedIn: 'root'
})
export class EurovisionService {
  private URL_API = 'https://eurovisionapi.runasp.net/api/';
  private URL_CATEGORY ='senior/'
  private URL_CONTEST = 'contests/';

  constructor(private http: HttpClient) { }

  public getCountryNames(): Observable<CountryMap>{
    return this.http.get<CountryMap>(`${this.URL_API}countries`);
  }

  public getContestDetailsByYear( year: String): Observable<Contest>{
    return this.http.get<Contest>(`${this.URL_API}${this.URL_CATEGORY}${this.URL_CONTEST}${year}`);
  }
}
