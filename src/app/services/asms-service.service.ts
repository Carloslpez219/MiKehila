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
    return this.http.get<T>(`${asmsURL}API_gestor_actividades.php?request=actividades&tipo=${this.datosUsuario.tipo_usuario}`);
    //return this.http.get<T>(`${asmsURL}API_gestor_actividades.php?request=actividades&tipo=5`);
  }

  async getCirculares<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=circulares&miembros=4,2&codigo_usuario=${this.datosUsuario.codigo}`);
    //return this.http.get<T>(`${asmsURL}API_gestor_circulares.php?request=circulares&usuario=1969`);
  }

  async getActividad<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_gestor_actividades.php?request=actividad&codigo=${codigo}`);
  }

  async getCircular<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=circular&codigo=${codigo}`);
  }

  async getMultimedia<T>(){
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=multimedia`);
  }

  async getDetalleMUltimedia<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=detalle_multimedia&codigo=${codigo}`);
  }

  async getPostIts<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=pinboard&miembro=${this.datosUsuario.codigo}`);
    //return this.http.get<T>(`${asmsURL}API_gestor_pinboard.php?request=postits_usuario&usuario=1969`);
  }

  async getEncuestas<T>(){
    return this.http.get<T>(`${asmsURL}API_encuestas.php?request=encuestas`);
  }

  async getPhotoAlbum<T>(){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`${asmsURL}API_photos.php?request=albumes&tipo=${this.datosUsuario.tipo_usuario}&codigo=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`${asmsURL}API_photos.php?request=albumes&tipo=${this.datosUsuario.tipo_usuario}&codigo=${this.datosUsuario.codigo}`);
  }

  async getDetalleAlbum<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_photos.php?request=detalle&codigo=${codigo}`);
  }

  async getDetallePostIt<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_gestor_pinboard.php?request=postit&codigo=${codigo}`);
  }

  async getNotificaciones<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_pushup_notification.php?request=list&user_id=${this.datosUsuario.codigo}`);
  }

  async getFamiliares<T>(){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`${asmsURL}API_familia.php.php?request=get_familiares&codigo=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`${asmsURL}API_familia.php?request=get_familiares&codigo=${this.datosUsuario.codigo}`);
  }

  async getDetallefamiliar<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_familia.php?request=get_familiar_detalle&codigo=${codigo}`);
  }

  async nuevofamiliar<T>(dpi: any, nombres: any, apellidos: any, parentesco: any, tel: any ,mail: any){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`${asmsURL}API_familia.php?request=nuevo_familiar&codigo=${this.datosUsuario.codigoUsuario}&dpi=${dpi}&nombres=${nombres}&apellidos=${apellidos}&parentesco=${parentesco}&tel=${tel}&mail=${mail}`)
    return this.http.get<T>(`${asmsURL}API_familia.php?request=nuevo_familiar&codigo=${this.datosUsuario.codigoUsuario}&dpi=${dpi}&nombres=${nombres}&apellidos=${apellidos}&parentesco=${parentesco}&tel=${tel}&mail=${mail}`);
  }
  
}
