import {Component, OnInit, ViewChild} from '@angular/core';
import {Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";
import {ActivatedRoute} from "@angular/router";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal

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

  usuario: {email: string; score: number} =
    {
      email: '',
      score: 0
    };

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.serieService.getSerie(params['id']).subscribe((res:any) => {
      this.serie = res;
      console.log(this.serie);
    })
  }

  cancel(){
    this.modal.dismiss(null, 'cancel');
  }

  onSubmit(){
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: any){
    if (event.detail.role === 'confirm') {
      //this.serie.user_score.push()
      this.serie.user_score.push(this.usuario);
      console.log(this.serie);
      this.serieService.updateSerie(this.serie._id, this.serie);
    }
  }
}
