import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    { title: 'Encuestas', url: '/encuestas', icon: 'checkbox' },
    { title: 'Actividades', url: '/actividades', icon: 'calendar' },
    { title: 'Familiares', url: '/familaires', icon: 'people' },
    { title: 'Soporte Tecnico', url: '/folder/trash', icon: 'construct' },
  ];
  constructor(private router: Router, private storage: Storage) {}

  async logOut(){
    this.router.navigateByUrl('/login');
    this.storage.remove('datos');
    this.storage.remove('ordenes');
    this.storage.clear();
  }
}
