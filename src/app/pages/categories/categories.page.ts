import { Component, OnInit } from '@angular/core';
import {Categorie} from "../../common/categorie";
import {CategorieService} from "../../services/categorie.service";
import {Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Categorie[] = [];
  series: Serie[] = [];
  options = {
    slidesPerView: 4,
    slidesOffsetBefore: 0,
    separator: 10
  }
  constructor(private categorieService: CategorieService,
              private serieService: SerieService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(): void {
    this.categorieService.getCategorieList().subscribe(
      (data:any) => {
        this.categories = data;
      }
    );
  }

  listSeriesByCategorie(categorie: Categorie): void {
    this.series = [];
    this.serieService.getSerieList().subscribe(
      (data: any) => {
        data.forEach((serie: Serie) => {
          serie.categories.forEach((categorieS: string) => {
            if (categorieS == categorie.name) {
              this.series.push(serie);
            }
          });
        });
      }
    );
  }
}
