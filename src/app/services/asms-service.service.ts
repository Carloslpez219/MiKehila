import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_encuestas.php?request=encuestas&codigo=${this.datosUsuario.codigo}`);
  }

  async getPhotoAlbum<T>(){
    this.datosUsuario = await this.storage.get('datos');
     (`${asmsURL}API_photos.php?request=albumes&tipo=${this.datosUsuario.tipo_usuario}&codigo=${this.datosUsuario.codigo}`);
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
     (`${asmsURL}API_familia.php.php?request=get_familiares&codigo=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`${asmsURL}API_familia.php?request=get_familiares&codigo=${this.datosUsuario.codigo}`);
  }

  async getDetallefamiliar<T>(codigo: any){
    return this.http.get<T>(`${asmsURL}API_familia.php?request=get_familiar_detalle&codigo=${codigo}`);
  }

  async nuevofamiliar<T>(dpi: any, nombres: any, apellidos: any, parentesco: any, tel: any ,mail: any){
    this.datosUsuario = await this.storage.get('datos');
     (`${asmsURL}API_familia.php?request=nuevo_familiar&codigo=${this.datosUsuario.codigo}&dpi=${dpi}&nombres=${nombres}&apellidos=${apellidos}&parentesco=${parentesco}&tel=${tel}&mail=${mail}`)
    return this.http.get<T>(`${asmsURL}API_familia.php?request=nuevo_familiar&codigo=${this.datosUsuario.codigo}&dpi=${dpi}&nombres=${nombres}&apellidos=${apellidos}&parentesco=${parentesco}&tel=${tel}&mail=${mail}`);
  }

  async getParentesco<T>(){
    return this.http.get<T>(`${asmsURL}API_familia.php?request=parentescos`);
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

  async updateIos<T>(device_id: any){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_pushup_notification.php?request=update_ios&device_id=${device_id}&user_id=${this.datosUsuario.codigo}`);
  }

  async removerDispositivo<T>(device_id: any){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_pushup_notification.php?request=unregister&user_id=${this.datosUsuario.codigo}&device_id=${device_id}`);
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
     (`${asmsURL}API_encuestas.php?request=responder&pregunta=${pregunta}&encuesta=${codigo}&persona=${this.datosUsuario.codigo}&tipo=${tipo}&ponderacion=${ponderacion}&respuesta=${respuesta}`);
    return this.http.get<T>(`${asmsURL}API_encuestas.php?request=responder&pregunta=${pregunta}&encuesta=${codigo}&persona=${this.datosUsuario.codigo}&tipo=${tipo}&ponderacion=${ponderacion}&respuesta=${respuesta}`);
  }

  async eliminarCuenta<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`${asmsURL}API_perfil_padre.php?request=situacion_usuario&codigoUsuario=${this.datosUsuario.codigo}`);
  }

  async getChats<T>(){
    this.datosUsuario = await this.storage.get('datos');
    // (`https://asms.pruebasgt.net/SISTEM/API/API_chat.php?request=lista_dialogos&codigoMiembro=14&tipo_usuario=3`);
    //return this.http.get<T>(`https://asms.pruebasgt.net/SISTEM/API/API_chat.php?request=lista_dialogos&codigoMiembro=14&tipo_usuario=3`);
     (`${asmsURL}API_chat.php?request=lista_dialogos&codigoMiembro=${this.datosUsuario.codigo}&tipo=${this.datosUsuario.tipo_usuario}`);
    return this.http.get<T>(`${asmsURL}API_chat.php?request=lista_dialogos&codigoMiembro=${this.datosUsuario.codigo}&tipo=${this.datosUsuario.tipo_usuario}`);
  }

  async getMessages<T>(dialogo: any){
    this.datosUsuario = await this.storage.get('datos');
    //return this.http.get<T>(`https://asms.pruebasgt.net/SISTEM/API/API_chat.php?request=lista_mensajes&codigoMiembro=14&dialogo=${dialogo}`);
     (`${asmsURL}API_chat.php?request=lista_mensajes&codigoMiembro=${this.datosUsuario.codigo}&dialogo=${dialogo}`);
    return this.http.get<T>(`${asmsURL}API_chat.php?request=lista_mensajes&codigoMiembro=${this.datosUsuario.codigo}&dialogo=${dialogo}`);
  }

  async getComunity<T>(){
    this.datosUsuario = await this.storage.get('datos');
    //return this.http.get<T>(`https://asms.pruebasgt.net/SISTEM/API/API_chat.php?request=get_usuarios_cm&tipo=3`);
     (`${asmsURL}API_chat.php?request=get_usuarios_cm&tipo=${this.datosUsuario.tipo_usuario}`);
    return this.http.get<T>(`${asmsURL}API_chat.php?request=get_usuarios_cm&tipo=${this.datosUsuario.tipo_usuario}`);
  }
  
  async sendMessage<T>(dialogo: any, message: any){
    this.datosUsuario = await this.storage.get('datos');
    //return this.http.get<T>(`https://asms.pruebasgt.net/SISTEM/API/API_chat.php?request=enviar&dialogo=${dialogo}&sender=14&sender_type=3&message=${message}`);
     (`${asmsURL}API_chat.php?request=enviar&dialogo=${dialogo}&sender=${this.datosUsuario.codigo}&sender_type=${this.datosUsuario.tipo_usuario}&message=${message}`);
    return this.http.get<T>(`${asmsURL}API_chat.php?request=enviar&dialogo=${dialogo}&sender=${this.datosUsuario.codigo}&sender_type=${this.datosUsuario.tipo_usuario}&message=${message}`);
  }

  async nuevoDialogo<T>(receiver_type: any, receiver: any, message: any){
    this.datosUsuario = await this.storage.get('datos');
     (`${asmsURL}API_chat.php?request=nuevo_dialogo&sender_type=${this.datosUsuario.tipo_usuario}&sender=${this.datosUsuario.codigo}&receiver_type=${receiver_type}&receiver=${receiver}&message=${message}`);
    //return this.http.get<T>(`https://asms.pruebasgt.net/SISTEM/API/API_chat.php?request=nuevo_dialogo&sender_type=3&sender=14&receiver_type=${receiver_type}&receiver=${receiver}&message=${message}`);
    return this.http.get<T>(`${asmsURL}API_chat.php?request=nuevo_dialogo&sender_type=${this.datosUsuario.tipo_usuario}&sender=${this.datosUsuario.codigo}&receiver_type=${receiver_type}&receiver=${receiver}&message=${message}`);
  }


  async uploadFile<T>(file: File, object: any, dialogo: any, request: string) {
    this.datosUsuario = await this.storage.get('datos');
    const formData = new FormData();
  
    formData.append('archivo', file, file.name);
    formData.append('request', request);
    formData.append('sender_type', this.datosUsuario.tipo_usuario);
    formData.append('sender', this.datosUsuario.codigo);
    formData.append('receiver_type', object.tipo);
    formData.append('receiver', object.codigoComunity);
    formData.append('dialogo', dialogo);
  
    const url = `${asmsURL}API_archivo_chat.php`;

    console.log(url, formData);
    return this.http.post<T>(url, formData);
  }
  
  async validarDispositivo<T>(device_id: any): Promise<boolean> {
    this.datosUsuario = await this.storage.get('datos');
    try {
      console.log(`${asmsURL}API_dispositivo_active.php?request=status_device&user_id=${this.datosUsuario.codigo}&device_id=${device_id}`);
      const respuesta: any = await this.http.get<T>(`${asmsURL}API_dispositivo_active.php?request=status_device&user_id=${this.datosUsuario.codigo}&device_id=${device_id}`).toPromise();
      return respuesta.status;
    } catch (error) {
      console.error("Error al validar el dispositivo", error);
      return false;
    }
  }
  

}
