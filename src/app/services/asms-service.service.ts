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
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=informacion&personas=3`);
    //return this.http.get<T>(`${asmsURL}API_gestor_actividades.php?request=actividades&tipo=5`);
  }

  async getCirculares<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=circulares&miembros=${this.datosUsuario.codigo}`);
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
    return this.http.get<T>(`${asmsURL}API_informacion.php?request=detalle_pinboard&codigo=${codigo}`);
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
    console.log(`${asmsURL}API_familia.php?request=nuevo_familiar&codigo=${this.datosUsuario.codigo}&dpi=${dpi}&nombres=${nombres}&apellidos=${apellidos}&parentesco=${parentesco}&tel=${tel}&mail=${mail}`)
    return this.http.get<T>(`${asmsURL}API_familia.php?request=nuevo_familiar&codigo=${this.datosUsuario.codigo}&dpi=${dpi}&nombres=${nombres}&apellidos=${apellidos}&parentesco=${parentesco}&tel=${tel}&mail=${mail}`);
  }
  
  async soporte<T>(json: any){
    return this.http.get<T>(`${asmsURL}API_contactanos.php?request=contactanos&data=${json}`);
  }

  async getDispositivos<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_perfil_padre.php?request=dispositivos&codigoMiembro=${this.datosUsuario.codigo}`);
  }

  async activarDesactivar<T>(dispositivo: any, situacion: any){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_perfil_padre.php?request=situacion_dispositivo&codigoMiembro=${this.datosUsuario.codigo}&dispositivo=${dispositivo}&situacion=${situacion}`);
  }

  async getDepartamentos<T>(){
    return this.http.get<T>(`${asmsURL}API_familia.php?request=get_departamentos`);
  }

  async getMunicipios<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_familia.php?request=get_municipios&departamento=${codigo}`);
  }

  async registrarDispositivo<T>(device_id: any, device_token: any, device_type: any){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_pushup_notification.php?request=register&user_id=${this.datosUsuario.codigo}&device_id=${device_id}&device_token=${device_token}&device_type=${device_type}&certificate_type=0`);
  }

  async setReadNotification<T>( type: any, item: any){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_pushup_notification.php?request=reset_especifica&user_id=${this.datosUsuario.codigo}&type=${type}&type_id=${item}`);
  }

  async getPreguntas<T>(codigo: any){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_encuestas.php?request=preguntas&encuesta=${codigo}&persona=${this.datosUsuario.codigo}`);
  }

  async responderPreguntas<T>(codigo: any, pregunta: any, tipo: any, ponderacion: any, respuesta: any ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_encuestas.php?request=responder&pregunta=${pregunta}&encuesta=${codigo}&persona=${this.datosUsuario.codigo}&tipo=${tipo}&ponderacion=${ponderacion}&respuesta=${respuesta}`);
  }

}
