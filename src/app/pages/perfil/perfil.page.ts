import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilData: any;
  mostrarData = true;
  profileForm: FormGroup;
  items = Array(3);
  myImage = null;
  // eslint-disable-next-line max-len
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private userService: UserService, private storage: Storage, private alertService: AlertService,
              private navCtrl: NavController) {
    this.profileForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getData();
    this.mostrarData = true;
  }

  createFormGroup() {
    return new FormGroup({
      dpi: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fechaNac: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      direccion: new FormControl('', [Validators.required]),
      trabajo: new FormControl('', [Validators.required]),
      telTra: new FormControl('', [Validators.required]),
      profesion: new FormControl('', [Validators.required])
    });
  }

  defaultValue( perfilData: any ){
    console.log(perfilData)
    this.profileForm.controls['dpi'].setValue(perfilData.cui);
    this.profileForm.controls['nombre'].setValue(perfilData.nombre);
    this.profileForm.controls['apellido'].setValue(perfilData.apellido);
    this.profileForm.controls['fechaNac'].setValue(perfilData.fecha_nacimiento);
    this.profileForm.controls['telefono'].setValue(perfilData.telefono);
    this.profileForm.controls['celular'].setValue(perfilData.celular);
    this.profileForm.controls['mail'].setValue(perfilData.mail);
    this.profileForm.controls['direccion'].setValue(perfilData.direccion);
    this.profileForm.controls['trabajo'].setValue(perfilData.nacionalidad);
    this.profileForm.controls['telTra'].setValue(perfilData.telefono_trabajo);
    this.profileForm.controls['profesion'].setValue(perfilData.profesion);
  }

  get dpi() { return this.profileForm.get('dpi'); }
  get nombre() { return this.profileForm.get('nombre'); }
  get apellido() { return this.profileForm.get('apellido'); }
  get fechaNac() { return this.profileForm.get('fechaNac'); }
  get telefono() { return this.profileForm.get('telefono'); }
  get celular() { return this.profileForm.get('celular'); }
  get mail() { return this.profileForm.get('mail'); }
  get direccion() { return this.profileForm.get('direccion'); }
  get trabajo() { return this.profileForm.get('trabajo'); }
  get telTra() { return this.profileForm.get('telTra'); }
  get profesion() { return this.profileForm.get('profesion'); }

  async getData() {
      (await this.userService.getPerfil()).subscribe((resp: any) => {
        this.perfilData = resp[0];
        this.defaultValue( this.perfilData );
        this.mostrarData = true;
      });
  }

  clean(){
    this.profileForm.reset();
  }

  back(){
    this.navCtrl.back({animated: true});
  }

}
