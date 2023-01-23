import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false})infiniteScroll!: IonInfiniteScroll
  data: any[] = Array(3);
  constructor() { }

  ngOnInit() {
  }

  loadData(event: any) {
    setTimeout(() => {
      if (this.data.length > 30) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      const nuevoArray = Array(3);
      this.data.push(...nuevoArray);
      event.target.complete();
    }, 1000);
  }
}
