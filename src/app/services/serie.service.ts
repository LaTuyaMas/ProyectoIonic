import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, from, Observable} from "rxjs";
import {Serie} from "../common/serie";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  baseURL = 'http://localhost:3678/api/series';

  constructor(private http: HttpClient) { }

  getSerieList(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseURL+"/");
  }

  getSerie(id : string): Observable<Serie> {
    return this.http.get<Serie>(this.baseURL+"/serie/"+id);
  }

  updateSerie(id: string, serie: Serie) {
    return this.http.put(this.baseURL+"/"+id, serie);
  }
}
