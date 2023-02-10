import {Component, OnInit, ViewChild} from '@angular/core';
import {Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";
import {ActivatedRoute} from "@angular/router";
import {IonModal, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal

  //Constructor vacío para la serie
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

  //Constructor vacío para user_score
  usuario: {email: string; score: number} =
    {
      email: '',
      score: 0
    };

  constructor(private serieService: SerieService,
              private activatedRoute: ActivatedRoute,
              private toastCtrl: ToastController) { }

  //Coge la serie que fue seleccionada
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.serieService.getSerie(params['id']).subscribe((res:any) => {
      this.serie = res;
      console.log(this.serie);
    });
  }

  //Las 2 puntuaciones medias devuelven lo mismo
  puntuacionMedia(): number{
    let total = 0;
    for(let i = 0; i < this.serie.user_score.length; i++) {
      total += this.serie.user_score[i].score;
    }
    return total / this.serie.user_score.length;
  }

  puntuacionMedia2(): number{
    let total = 0;
    this.serie.user_score.forEach((user) => {
      total += user.score;
    });
    let media = total / this.serie.user_score.length;
    return Math.round(media * 10) / 10;
  }

  //Toast
  private async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color
    });
    await toast.present();
  }

  //Funciones para el formulario
  cancel(){
    this.modal.dismiss(null, 'cancel');
  }

  onSubmit(){
    let submit = true;
    this.serie.user_score.forEach((user) => {
      if (user.email == this.usuario.email) {
        this.presentToast('Ya existe una puntuación con ese correo', 'danger');
        this.usuario.email = '';
        submit = false;
        return;
      }
    });
    if (submit){
      this.modal.dismiss(null, 'confirm');
    }
  }

  onWillDismiss(event: any){
    if (event.detail.role === 'confirm') {
      this.serie.user_score.push(this.usuario);
      console.log(this.serie);
      this.serieService.updateSerie(this.serie._id, this.serie).subscribe();
      this.usuario = {email: '', score: 0};
      this.presentToast('Puntuación añadida', 'tertiary');
    }
  }
}
