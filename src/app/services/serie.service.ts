import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
}