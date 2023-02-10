import {Component, OnInit, ViewChild} from '@angular/core';
import {SerieService} from "../../services/serie.service";
import {IonInfiniteScroll, LoadingController} from "@ionic/angular";
import {Serie} from "../../common/serie";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false})infiniteScroll!: IonInfiniteScroll
  textoBuscar = '';
  series: Serie[] = [];
  serieArray: Serie[] = [];
  currentPage = 0;
  pages = 0;

  constructor(private serieService: SerieService,
              private loadingCrtl: LoadingController) { }

  ngOnInit() {
    this.serieService.getSerieList().subscribe(series => {
      this.serieArray = series;
      this.pages = series.length;
    });
    this.loadSeries();
  }

  buscar(event: any) {
    this.textoBuscar = event.detail.value;
  }

  async loadSeries(event?: any) {
    const loading = await this.loadingCrtl.create({
      message: 'Cargando...',
      spinner: 'lines'
    });
    await loading.present();

    if (this.currentPage < this.pages) {
      this.series.push(this.serieArray[this.currentPage]);
      if (this.currentPage+1 < this.pages) {
        this.series.push(this.serieArray[this.currentPage+1]);
        if (this.currentPage+2 < this.pages) {
          this.series.push(this.serieArray[this.currentPage+2]);
        }
        else {
          this.dismissInfinite(event);
        }
      }
      else {
        this.dismissInfinite(event);
      }
    }
    else {
      this.dismissInfinite(event);
    }

    loading.dismiss();
    event?.target.complete();
  }

  loadMore(event: any) {
    this.currentPage += 3;
    this.loadSeries(event);
  }

  dismissInfinite(event: any) {
    event.target.complete();
    this.infiniteScroll.disabled = true;
  }
}
