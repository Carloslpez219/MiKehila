import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { CrearFamiliarPage } from '../crear-familiar/crear-familiar.page';
import { DetalleFamiliarPage } from '../detalle-familiar/detalle-familiar.page';

@Component({
  selector: 'app-familaires',
  templateUrl: './familaires.page.html',
  styleUrls: ['./familaires.page.scss'],
})
export class FamilairesPage implements OnInit {

  familiares: any;

  constructor(private asmsService: AsmsServiceService, private loadingController: LoadingController, private navCtrl: NavController,
    private modalController: ModalController, private alerService: AlertService) { }

    async ngOnInit() {
      this.presentLoading();
      (await this.asmsService.getFamiliares()).subscribe((resp: any)=>{
        this.familiares = resp.data;
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
      (await this.asmsService.getDetallefamiliar(codigo)).subscribe(async (resp: any) =>{
          const multimedia = resp.data[0];
          const modal = await this.modalController.create({
            component: DetalleFamiliarPage,
            backdropDismiss: false,
            componentProps: { multimedia }       
          });
          await modal.present(); 
      },
      (error: any) => {
        console.error('Error al obtener actividad:', error);
      }
      ); 
    } 

    async mostrarModal2() {
      await this.presentLoading();
          const modal = await this.modalController.create({
            component: CrearFamiliarPage,
            backdropDismiss: false,     
          });
          await modal.present();  
          
                
          const value: any = await modal.onDidDismiss();
          if(value.data === true){
            this.presentLoading();
            (await this.asmsService.getFamiliares()).subscribe((resp: any)=>{
              this.familiares = resp.data;
              this.loadingController.dismiss();
            })
          }
        
    } 

}
