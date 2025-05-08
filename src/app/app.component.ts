import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from './services/alert.service';
import { AsmsServiceService } from './services/asms-service.service';
import { PushNotifications, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Device } from '@capacitor/device';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/Notificaciones', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'people' },
    { title: 'Familiares', url: '/familaires', icon: 'people' },
    { title: 'Actividades', url: '/actividades', icon: 'calendar' },
    { title: 'Dispositivos', url: '/dispositivos', icon: 'phone-portrait' },
    { title: 'Encuestas', url: '/encuestas', icon: 'checkbox' },
    { title: 'Soporte Tecnico', url: '/soporte', icon: 'construct' },
    
  ];
  constructor(private navCtrl: NavController, private storage: Storage, private actionSheetCtrl: ActionSheetController, private asmsService: AsmsServiceService, private alertService: AlertService) {}

  async logOut(){

    const id = await Device.getId();
    (await this.asmsService.removerDispositivo(id.identifier)).subscribe((resp: any)=>{
      if(resp.status){
        // this.alertService.presentToast(resp.message, 'success', 3000);
        PushNotifications.removeAllListeners();
        PushNotifications.unregister();
        this.navCtrl.navigateRoot('/login')
        this.storage.remove('datos');
        this.storage.remove('ordenes');
        this.storage.clear();
      }else{
        this.alertService.presentToast(resp.message, 'danger', 3000);
      }
    })
  }

  async eliminarCuenta(){
      const actionSheet1 = await this.actionSheetCtrl.create({
        header: 'Esta seguro de eliminar su cuenta?',
        buttons: [
          {
            text: 'Aceptar',
            role: 'destructive',
            handler: () => {
              this.desactivar();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          },
        ],
      });
  
      await actionSheet1.present();
  }

  async desactivar(){
    (await this.asmsService.eliminarCuenta()).subscribe((resp: any)=>{
      if(resp.status){
        this.alertService.presentToast(resp.message, 'success', 3000);
        this.logOut();
      }else{
        this.alertService.presentToast(resp.message, 'danger', 3000);
      }
    })
  }
}
