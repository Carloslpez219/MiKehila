import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AsmsServiceService } from 'src/app/services/asms-service.service';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit {

  dispositivos: any;

  constructor(private navCtrl: NavController, private loadingController: LoadingController, private asmsService: AsmsServiceService, private actionSheetCtrl: ActionSheetController, private alert: AlertService) { }

  async ngOnInit() {
    this.presentLoading();
    (await this.asmsService.getDispositivos()).subscribe((resp: any)=>{
       (resp)
      this.dispositivos = resp.data;
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

  async presentActionSheet(estado: any, dispositivo: any) {

    if(estado == "0"){
      const actionSheet1 = await this.actionSheetCtrl.create({
        header: 'Activar el dispositivo?',
        buttons: [
          {
            text: 'Activar',
            handler: () => {
              this.desactivar('1', dispositivo);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          },
        ],
      });
  
      await actionSheet1.present();
    }else{
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Desactivar el dispositivo?',
        buttons: [
          {
            text: 'Desactivar',
            role: 'destructive',
            handler: () => {
              this.desactivar('0', dispositivo);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          },
        ],
      });

      await actionSheet.present();
    }
  }

  

  async desactivar(estado: any, dispositivo: any){
    (await this.asmsService.activarDesactivar(dispositivo, estado)).subscribe(async (resp: any)=>{
      if(resp.status){
        this.alert.presentToast(resp.message, 'success', 3000);
      }else{
        this.alert.presentToast(resp.message, 'danger', 3000);
      }
      this.presentLoading();
      (await this.asmsService.getDispositivos()).subscribe((resp: any)=>{
         (resp)
        this.dispositivos = resp.data;
        this.loadingController.dismiss();
      })
    });
  }
}
