import { Component } from '@angular/core';
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
    { title: 'Soporte Tecnico', url: '/folder/trash', icon: 'construct' },
  ];
  constructor() {}
}
