import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from './alert.service';

const loginUrl = environment.loginUrl;
const ajustesUrl = environment.loginUrl;
const asmsURL = environment.asmsURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data = null;
  datosUsuario: any;

  constructor( private http: HttpClient, private storage: Storage, private alertService: AlertService ) {
    this.storage.create();
   }

  login<T>( usu: any, password: any){
    return new Promise (resolve => {
      this.http.get(`${loginUrl}login&usu=${usu}&pass=${password}`).subscribe(async (resp: any) => {
        // console.log(`${loginUrl}login&usu=${usu}&pass=${password}`)
        if ( resp.status ){
          await this.datosLocalStorage( resp.data );
          resolve(true);
        }else{
          this.data = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async datosLocalStorage( data: null){
    this.storage.create();
    this.data = data;
    await this.storage.set('datos', data);
  }

  async getPerfil<T>(codigoPerfil: any = '', tipoPerfil: any = ''){
    var codigo: any;
    var tipo_usuario: any;
    if (codigoPerfil == "" && tipoPerfil == "") {
      this.datosUsuario = await this.storage.get('datos');
      codigo = this.datosUsuario.codigo;
      tipo_usuario = this.datosUsuario.tipo_usuario
    } else {
      codigo = codigoPerfil;
      tipo_usuario = tipoPerfil;
    }
    return this.http.get<T>(`${asmsURL}API_perfil_padre.php?request=get_padre&tipo=${tipo_usuario}&codigo=${codigo}`);
  }

  async registro<T>(dpi: any, email: any, nombre: any, apellido: any){
    return this.http.get<T>(`${asmsURL}API_perfil_padre.php?request=registro&dpi=${dpi}&email=${email}&nombre=${nombre}&apellido=${apellido}`);
  }

  async updateFamilyMemberProfile(cui: string, tipoCui: string, nombre: string, apellido: string, nombreJudio: string, fechaNac: string, fechaJudia: string, momentoDia: string, barMitzva: string, fechaFallecimiento: string, estadoCivil: string, nacionalidad: string, telCasa: string, celular: string, email: string, direccion: string, departamento: string, municipio: string, trabajo: string, telTrabajo: string, profesion: string, genero: string, sangre: string, alergia: string, emergencia: string, emeTel: string, parasha: string, codigoPerfil: any = '') {
    var codigo: any;
    if (codigoPerfil == '') {
      this.datosUsuario = await this.storage.get('datos');
      codigo = this.datosUsuario.codigo;
    } else {
      codigo = codigoPerfil;
    }
    // console.log(`${asmsURL}API_perfil_padre.php?request=update_padre_completo&codigo_unico=${codigo}&cui=${cui}&tipocui=${tipoCui}&nombre=${nombre}&apellido=${apellido}&nombreJudio=${nombreJudio}&fecnac=${fechaNac}&fechaJudia=${fechaJudia}&momentoDia=${momentoDia}&barMitzva=${barMitzva}&fechaFallecimiento=${fechaFallecimiento}&estadoCivil=${estadoCivil}&nacionalidad=${nacionalidad}&telcasa=${telCasa}&celular=${celular}&mail=${email}&direccion=${direccion}&departamento=${departamento}&municipio=${municipio}&trabajo=${trabajo}&teltrabajo=${telTrabajo}&profesion=${profesion}&genero=${genero}&sangre=${sangre}&alergia=${alergia}&emergencia=${emergencia}&emetel=${emeTel}&parasha=${parasha}`)
    return this.http.get(`${asmsURL}API_perfil_padre.php?request=update_padre_completo&codigo_unico=${codigo}&cui=${cui}&tipocui=${tipoCui}&nombre=${nombre}&apellido=${apellido}&nombreJudio=${nombreJudio}&fecnac=${fechaNac}&fechaJudia=${fechaJudia}&momentoDia=${momentoDia}&barMitzva=${barMitzva}&fechaFallecimiento=${fechaFallecimiento}&estadoCivil=${estadoCivil}&nacionalidad=${nacionalidad}&telcasa=${telCasa}&celular=${celular}&mail=${email}&direccion=${direccion}&departamento=${departamento}&municipio=${municipio}&trabajo=${trabajo}&teltrabajo=${telTrabajo}&profesion=${profesion}&genero=${genero}&sangre=${sangre}&alergia=${alergia}&emergencia=${emergencia}&emetel=${emeTel}&parasha=${parasha}`);
  }

  async uploadProfilePicture<T>(file: File, codigoPerfil: any = '') {
    this.datosUsuario = await this.storage.get('datos');
    const formData = new FormData();
    formData.append('imagen', file, file.name);
    if (codigoPerfil == '') {
      formData.append('codigoUsuarioMiembro', this.datosUsuario.codigo);
    } else {
      formData.append('codigoUsuarioMiembro', codigoPerfil);
    }
  
    const url = `${asmsURL}API_foto_perfil_miembro.php`;
  
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
  
    return this.http.post(url, formData, httpOptions);
  }
  
  async buscaCUI<T>(cui: string, email: any, celular: any){
    return this.http.get<T>(`${asmsURL}API_perfil_padre.php?request=busca_datos&cui=${cui}&email=${email}&celular=${celular}`);
  }

  async calculoDeFechas<T>(fechaNac: string, momentoDia: any){ // Calcula fecha judia, parsha(pendiente) y edad
    console.log(`${asmsURL}API_perfil_padre.php?request=calcular&fecha=${fechaNac}&momentoDia=${momentoDia}`);
    return this.http.get<T>(`${asmsURL}API_perfil_padre.php?request=calcular&fecha=${fechaNac}&momentoDia=${momentoDia}`);
  }
}
