import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Device } from '@capacitor/device';
import { AsmsServiceService } from '../services/asms-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage, private asmsService: AsmsServiceService){
  }

  async canActivate() {
    this.storage.create();
    const datosUsuario = await this.storage.get('datos');
    const id = await Device.getId();
    const valido = await this.asmsService.validarDispositivo(id.identifier);
    if ( datosUsuario && valido ) {
      return true;
    }else{
      this.storage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
