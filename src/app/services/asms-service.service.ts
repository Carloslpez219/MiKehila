import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const asmsURL = environment.asmsURL;

@Injectable({
  providedIn: 'root'
})
export class AsmsServiceService {

  data = null;
  datosUsuario: any;
  datosActividad: any;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
   }

  async getActividades<T>(){
    this.datosUsuario = await this.storage.get('datos');
    //return this.http.get<T>(`${asmsURL}API_gestor_actividades.php?request=actividades&tipo=${this.datosUsuario.tipo_usuario}`);
    return this.http.get<T>(`${asmsURL}API_gestor_actividades.php?request=actividades&tipo=5`);
  }

  async getCirculares<T>(){
    this.datosUsuario = await this.storage.get('datos');
    //return this.http.get<T>(`${asmsURL}API_gestor_circulares.php?request=circulares&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`${asmsURL}API_gestor_circulares.php?request=circulares&usuario=1969`);
  }

  async getActividad<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_gestor_actividades.php?request=actividad&codigo=${codigo}`);
  }

  async getCircular<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_gestor_circulares.php?request=circular&codigo=${codigo}`);
  }

  async getMultimedia<T>(){
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=multimedia`);
  }

  async getPostIts<T>(){
    this.datosUsuario = await this.storage.get('datos');
    //return this.http.get<T>(`${asmsURL}API_gestor_pinboard.php?request=postits_usuario&usuario=1969`);
    return this.http.get<T>(`${asmsURL}API_gestor_pinboard.php?request=postits_usuario&usuario=1969`);
  }
}
