import { Component, OnInit } from '@angular/core';
import {SerieService} from "../../services/serie.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  textoBuscar = '';
  series: any[] = [];

  constructor(private serieService: SerieService) { }

  ngOnInit() {
    this.serieService.getSerieList().subscribe(series => {
      this.series = series;
    });
  }

  buscar(event: any) {
    this.textoBuscar = event.detail.value;
  }
}
