import { Component, OnInit } from '@angular/core';
import {Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  serie: Serie = {
    _id: '',
    images: [''],
    title: '',
    categories: [''],
    episodes: 0,
    year: 0,
    plot: '',
    user_score: [{
      email: '',
      score: 0
    }]
  }

  constructor(private serieService: SerieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.serieService.getSerie(params['_id']).subscribe((res:any) => {
      this.serie = res;
      console.log(this.serie);
    })
  }

}
