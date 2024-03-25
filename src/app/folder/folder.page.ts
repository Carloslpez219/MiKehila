import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { DetallePinboardPage } from '../pages/detalle-pinboard/detalle-pinboard.page';
import { AsmsServiceService } from '../services/asms-service.service';
import { PdfViewerPage } from '../pages/pdf-viewer/pdf-viewer.page';
import { DetalleMultimediaPage } from '../pages/detalle-multimedia/detalle-multimedia.page';
import { DetallePhotoalbumPage } from '../pages/detalle-photoalbum/detalle-photoalbum.page';
import { ActividadPage } from '../pages/actividad/actividad.page';
import { DetalleEncuestaPage } from '../pages/detalle-encuesta/detalle-encuesta.page';
import { PushNotifications, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { Capacitor } from '@capacitor/core';
import { DetalleCircularPage } from '../pages/detalle-circular/detalle-circular.page';


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

  constructor(private alertService: AlertService, private platform: Platform, private asmsService: AsmsServiceService, private navCtrl:NavController, private loadingController: LoadingController, private modalController: ModalController, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    // this.presentLoading();
    this.getData();
    if (Capacitor.isPluginAvailable('PushNotifications')){
      if (this.platform.is('ios')){
        const id = await Device.getId();
        (await this.asmsService.updateIos(id.identifier)).subscribe(resp => {
            console.log(resp);
        });
      } else {
        this.initializeApp();
      }
    }

  }

  async getData(){
    (await this.asmsService.getNotificaciones()).subscribe((resp: any)=>{
      this.notificaciones = resp.data;
       (resp)
      this.loadingController.dismiss();
    });
    (await this.asmsService.getPostIts()).subscribe((resp: any)=>{
       (resp);
      this.postIts = resp.data;
      this.loadingController.dismiss();
    });
    (await this.asmsService.getCirculares()).subscribe((resp: any)=>{
       (resp);
      this.circulares = resp.data;
      this.loadingController.dismiss();
    });
  }

  async doRefresh(event: any){
    this.presentLoading();
    this.getData().then(() => {
      event.target.complete();
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

  async mostrarCircularImg(img: string, type: string, titulo: string, descripcion: string ) {
        let imgSrc = img; 
        const modal = await this.modalController.create({
          component: DetalleCircularPage,
          backdropDismiss: false,
          componentProps: { imgSrc, type, titulo, descripcion }
        });
        await modal.present();      
  }

  async mostrarModalPDF(pdf: string, titulo: string, descripcion: string) {
        let pdfSrc = pdf; 
        const modal = await this.modalController.create({
          component: PdfViewerPage,
          backdropDismiss: false,
          componentProps: { pdfSrc, titulo, descripcion }
        });
        await modal.present();      
  } 

  abrirEnlace(link: string) {
    window.open(link, '_system');
  }
  

  async mostrarModalMultimedia( codigo: any ) {
    await this.presentLoading();
    (await this.asmsService.getDetalleMUltimedia(codigo)).subscribe(async (resp: any) =>{
        const multimedia = resp.data[0];
        const modal = await this.modalController.create({
          component: DetalleMultimediaPage,
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

  async mostrarModalPhotoAlbum( codigo: any ) {
    await this.presentLoading();
    (await this.asmsService.getDetalleAlbum(codigo)).subscribe(async (resp: any) =>{
        const multimedia = resp.data[0];
        const modal = await this.modalController.create({
          component: DetallePhotoalbumPage,
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

  async mostrarModalActividad( codigo: any ) {
    await this.presentLoading();
    (await this.asmsService.getActividad(codigo)).subscribe(async (resp: any) =>{
        const actividad = resp.data[0];
        const modal = await this.modalController.create({
          component: ActividadPage,
          backdropDismiss: false,
          componentProps: { actividad }
        });
        await modal.present();      
    },
    (error: any) => {
      console.error('Error al obtener actividad:', error);
    }
    ); 
  } 

  async setReadNotification(type: any, item: any){
    (await this.asmsService.setReadNotification(type, item)).subscribe((resp: any) =>{
      if(resp.status){
        this.getData();
      }
    })
  }

  redirigir(item: any){
    if (item.type === '1') {
      this.mostrarModal(item.item_id);
    } else if (item.type === '3') {
      this.mostrarModalActividad(item.item_id);
    } else if (item.type === '4') {
       (item);
      this.openModal(item);
    } else if (item.type === '5') {
      this.mostrarModalMultimedia(item.item_id);
    } else if (item.type === '6') {
      if(item.extension === 'pdf'){
        this.mostrarModalPDF(item.link, item.titulo, item.descripcion)
      }else{
        console.log(item.link);
        this.mostrarCircularImg(item.link, item.extension, item.titulo, item.descripcion)
      }
    } else if (item.type === '11') {
      this.mostrarModalPhotoAlbum(item.item_id);
    } else if (item.type === '12') {
      const dialog = item.item_id;
      this.navCtrl.navigateForward(`/chats?dialog=${dialog}`);
       ("Chat");
    } else if (item.type === '100') {
       ("General");
    } else {
       ("Tipo de notificación desconocido");
    }
    
  }

  toChats(){
    this.navCtrl.navigateForward('/chats');
  }

  async openModal(encuesta: any) {
    this.presentLoading();
    const modal = await this.modalController.create({
      component: DetalleEncuestaPage,
      componentProps: {
        encuesta
      }
    });
    return await modal.present();
  }

  async initializeApp() {
    var isGranted = '';
    const permissionCheck = await PushNotifications.checkPermissions();
    if (permissionCheck.receive !== 'granted'){
      const permission = await PushNotifications.requestPermissions();
      isGranted = permission.receive;
    }else{
      isGranted = 'granted';
    }
    if (isGranted === 'granted') {
      PushNotifications.register();

      const id = await Device.getId();

      await PushNotifications.addListener('registration', async token => {
        console.info('Registration token: ', token.value);
        let device_type = '';
        if (this.platform.is('android')) {
          device_type = await 'android';
        }else if (this.platform.is('ios')) {
          device_type = await 'ios';
        }
        await (await this.asmsService.registrarDispositivo(id.identifier, token.value, device_type)).subscribe(resp =>{
          console.log(resp);
        })
      });

      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        console.log('Push received: ', notification);
        this.alertService.presentToast('Nueva notificación', 'dark', 4000);
        this.navCtrl.navigateRoot('folder/Notificaciones');
        // this.navCtrl.navigateForward('folder/Notificaciones');
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
        console.log('Push actionPerf: ', action);
        this.navCtrl.navigateRoot('folder/Notificaciones');
        // this.navCtrl.navigateForward('folder/Notificaciones');
      });
    }
}

}
