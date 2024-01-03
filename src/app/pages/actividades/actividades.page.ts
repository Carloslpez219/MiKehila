import { Component, OnInit } from '@angular/core';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ActividadPage } from 'src/app/pages/actividad/actividad.page';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  actividades: any;

  constructor(private asmsService: AsmsServiceService, private navCtrl: NavController, 
    public loadingController: LoadingController, private modalController: ModalController) { }

  async ngOnInit() {
    this.presentLoading();
    (await this.asmsService.getActividades()).subscribe((resp:any)=>{
      this.actividades = Object.values(resp).filter((item: any) => typeof item === 'object' && item.codigo);
      this.loadingController.dismiss();
    });
  }

  async mostrarModal( codigo: any ) {
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

  back(){
    this.navCtrl.back({animated: true});
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

}
