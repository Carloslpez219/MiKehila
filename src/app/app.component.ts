import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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
  constructor(private navCtrl: NavController, private storage: Storage) {}

  async logOut(){
    this.navCtrl.navigateRoot('/login')
    this.storage.remove('datos');
    this.storage.remove('ordenes');
    this.storage.clear();
  }
}
