import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from "@ionic/angular";
import {Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false})infiniteScroll!: IonInfiniteScroll
  series: Serie[] = [];
  pages = 0;

  constructor(private serieService: SerieService) { }

  ngOnInit(): void {
    this.listSeries();
  }

  listSeries(): void {
    this.serieService.getSerieList().subscribe(
      (data: any) => {
        this.series = data;
        this.pages = data.length;
      }
    );
  }

  loadData(event: any) {
    setTimeout(() => {
      if (this.series.length >= this.pages) {
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
