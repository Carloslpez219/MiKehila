import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { DetallePhotoalbumPage } from '../detalle-photoalbum/detalle-photoalbum.page';

@Component({
  selector: 'app-photoalbum',
  templateUrl: './photoalbum.page.html',
  styleUrls: ['./photoalbum.page.scss'],
})
export class PhotoalbumPage implements OnInit {

  multimedia: any;

  constructor(private asmsService: AsmsServiceService, private loadingController: LoadingController, private navCtrl: NavController,
    private modalController: ModalController) { }

  async ngOnInit() {
    this.presentLoading();
    (await this.asmsService.getPhotoAlbum()).subscribe((resp: any)=>{
      this.multimedia = resp.data;
      this.loadingController.dismiss();
    })
  }

  back(){
    this.navCtrl.back({animated: true});
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async mostrarModal( codigo: any ) {
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
}
