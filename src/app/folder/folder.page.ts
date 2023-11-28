import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { DetallePinboardPage } from '../pages/detalle-pinboard/detalle-pinboard.page';
import { AsmsServiceService } from '../services/asms-service.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  segmento = 'notificaciones';
  postIts: any = null;
  circulares: any = null;
  notificaciones: any = null;

  constructor(private asmsService: AsmsServiceService, private navCtrl:NavController, private loadingController: LoadingController, private modalController: ModalController) {}

  async ngOnInit() {
    (await this.asmsService.getNotificaciones()).subscribe((resp: any)=>{
      if(resp.status !== 'vacio'){
        this.notificaciones = resp;
      }
    });
    (await this.asmsService.getPostIts()).subscribe((resp: any)=>{
      this.postIts = resp;
    });
    (await this.asmsService.getCirculares()).subscribe((res: any)=>{
      this.circulares = res;
    })
  }

  openLink(url: string) {
    window.open(url, '_system');
  }

  segment(ev: any){
    if(ev.detail.value === 'multimedia'){
      this.segmento = 'multimedia';
    }else if(ev.detail.value === 'pinboard'){
      this.segmento = 'pinboard';
    }else if(ev.detail.value === 'circulares'){
      this.segmento = 'circulares';
    }else if(ev.detail.value === 'notificaciones'){
      this.segmento = 'notificaciones';
    }
  }

  toMultimedia(){
    this.navCtrl.navigateForward('/multimedia');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  toPhoto(){
    this.navCtrl.navigateForward('/photoalbum');
  }

  async mostrarModal( codigo: any ) {
    await this.presentLoading();
    (await this.asmsService.getDetallePostIt(codigo)).subscribe(async (resp: any) =>{
        const multimedia = resp;
        const modal = await this.modalController.create({
          component: DetallePinboardPage,
          backdropDismiss: false,
          componentProps: { multimedia}       
        });
        await modal.present();      
      
    },
    (error: any) => {
      console.error('Error al obtener actividad:', error);
    }
    ); 
  } 
}
