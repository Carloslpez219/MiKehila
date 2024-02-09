import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
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
  segmentValue: string = '';

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform, private asmsService: AsmsServiceService, private alertService: AlertService) { }

  async ngOnInit() {
    (await this.asmsService.getPreguntas(this.encuesta.codigo || this.encuesta.item_id)).subscribe((resp:any)=>{
      this.preguntas = resp.data;
      this.loadingController.dismiss();
       (resp)
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

  async responder(pregunta: any, respuesta: any){
    (await this.asmsService.responderPreguntas(this.encuesta.codigo|| this.encuesta.item_id, pregunta.codigo, pregunta.tipo, respuesta.detail.value, ''))
    .subscribe((resp: any) =>{
      if(resp.status){
        this.alertService.presentToast(resp.message, 'success', 3000);
      }else{
        this.alertService.presentToast(resp.message, 'danger', 3000);
      }
    });
  }

  async responderVF(pregunta: any, respuesta: any){
    this.segmentValue = respuesta.detail.value;
    (await this.asmsService.responderPreguntas(this.encuesta.codigo|| this.encuesta.item_id, pregunta.codigo, pregunta.tipo, " ", respuesta.detail.value))
    .subscribe((resp: any) =>{
       (resp);
      if(resp.status){
        this.alertService.presentToast(resp.message, 'success', 3000);
      }else{
        this.alertService.presentToast(resp.message, 'danger', 3000);
      }
    });
  }

  async responderInput(pregunta: any, respuesta: any){
    (await this.asmsService.responderPreguntas(this.encuesta.codigo|| this.encuesta.item_id, pregunta.codigo, pregunta.tipo, " ", respuesta))
    .subscribe((resp: any) =>{
      if(resp.status){
        this.alertService.presentToast(resp.message, 'success', 3000);
      }else{
        this.alertService.presentToast(resp.message, 'danger', 3000);
      }
    });
  }

}
