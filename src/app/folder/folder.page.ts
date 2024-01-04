import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { DetallePinboardPage } from '../pages/detalle-pinboard/detalle-pinboard.page';
import { AsmsServiceService } from '../services/asms-service.service';
import { PdfViewerPage } from '../pages/pdf-viewer/pdf-viewer.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  segmento = 'notificaciones';
  postIts: any;
  circulares: any;
  notificaciones: any;

  constructor(private asmsService: AsmsServiceService, private navCtrl:NavController, private loadingController: LoadingController, private modalController: ModalController, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    (await this.asmsService.getNotificaciones()).subscribe((resp: any)=>{
      this.notificaciones = resp.data;
    });
    (await this.asmsService.getPostIts()).subscribe((resp: any)=>{
      this.postIts = resp.data;
    });
    (await this.asmsService.getCirculares()).subscribe((resp: any)=>{
      this.circulares = resp.data;
      console.log(resp)
    });
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

  async mostrarModalPDF(pdf: string) {
        let pdfSrc = pdf; 
        const modal = await this.modalController.create({
          component: PdfViewerPage,
          backdropDismiss: false,
          componentProps: { pdfSrc }
        });
        await modal.present();      
   
  } 
}
