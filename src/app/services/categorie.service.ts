import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorie} from "../common/categorie";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  baseURL = 'http://localhost:3678/api/categories';
  constructor(private http: HttpClient) { }

  getCategorieList(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.baseURL+"/");
  }
}
