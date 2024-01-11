import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';

@Component({
  selector: 'app-detalle-encuesta',
  templateUrl: './detalle-encuesta.page.html',
  styleUrls: ['./detalle-encuesta.page.scss'],
})
export class DetalleEncuestaPage implements OnInit {

  @Input() encuesta: any;
  viewEntered: any;
  preguntas: any;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform, private asmsService: AsmsServiceService) { }

  async ngOnInit() {
    (await this.asmsService.getPreguntas(this.encuesta.codigo)).subscribe((resp:any)=>{
      this.preguntas = resp.data;
      this.loadingController.dismiss();
      console.log(resp)
    })
  }

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }

}
