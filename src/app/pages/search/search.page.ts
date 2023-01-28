import {Component, OnInit, ViewChild} from '@angular/core';
import {SerieService} from "../../services/serie.service";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false})infiniteScroll!: IonInfiniteScroll
  textoBuscar = '';
  series: any[] = [];
  pages = 0;

  constructor(private serieService: SerieService) { }

  ngOnInit() {
    this.serieService.getSerieList().subscribe(series => {
      this.series = series;
      this.pages = series.length;
    });
  }

  buscar(event: any) {
    this.textoBuscar = event.detail.value;
  }

  loadData(event: any) {
    setTimeout(() => {
      if (this.series.length > this.pages) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      const nuevoArray = Array(3);
      this.series.push(...nuevoArray);
      event.target.complete();
    }, 1000);
  }
}
