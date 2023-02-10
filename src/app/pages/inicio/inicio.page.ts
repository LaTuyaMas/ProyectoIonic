import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, LoadingController} from "@ionic/angular";
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
  serieArray: Serie[] = [];
  currentPage = 0;
  pages = 0

  constructor(private serieService: SerieService,
              private loadingCrtl: LoadingController) { }

  ngOnInit(): void {
    this.listSeries();
    this.loadSeries();
  }

  listSeries(): void {
    this.serieService.getSerieList().subscribe(
      (data: any) => {
        this.serieArray = data;
        this.pages = data.length;
      }
    );
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
    console.log("loading dismissed");
  }

  loadMore(event: any) {
    this.currentPage += 3;
    console.log(this.currentPage);
    console.log(this.pages);
    this.loadSeries(event);
  }

  dismissInfinite(event: any) {
    console.log("dismissed");
    event.target.complete();
    this.infiniteScroll.disabled = true;
  }
}
