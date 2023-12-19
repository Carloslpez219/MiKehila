import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { LoadingController, NavController } from '@ionic/angular';

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
  date = "";

  constructor(private userService: UserService, private storage: Storage, private alertService: AlertService,
              private navCtrl: NavController, private loadingController: LoadingController) {
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
        dpi: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
        celular: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
        mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
        direccion: new FormControl('', [Validators.required]),
        trabajo: new FormControl('', [Validators.required]),
        telTra: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
        profesion: new FormControl('', [Validators.required])
    });
}

onlyNumbers(event: KeyboardEvent) {
  const allowedRegex = /[0-9]/;

  if (!allowedRegex.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

  defaultValue( perfilData: any ){
    console.log(perfilData)
    this.profileForm.controls['dpi'].setValue(perfilData.cui);
    this.profileForm.controls['nombre'].setValue(perfilData.nombre);
    this.profileForm.controls['apellido'].setValue(perfilData.apellido);
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
        this.date = resp[0].fecha_nacimiento + "T00:00:00";
        this.mostrarData = true;
      });
  }

  clean(){
    this.profileForm.reset();
  }

  back(){
    this.navCtrl.back({animated: true});
  }

  cambioFecha(ev: any){
    console.log(ev)
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }


  async updatePerfil(){
    await this.presentLoading();
    (await this.userService.update(this.profileForm.value.dpi, 'cui', this.profileForm.value.dpi)).subscribe(async resp =>{
      console.log(resp);
    });
    (await this.userService.update(this.profileForm.value.dpi, 'nombre', this.profileForm.value.nombres)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'apellido', this.profileForm.value.apellido)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'telefono', this.profileForm.value.telefono)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'celular', this.profileForm.value.celular)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'direccion', this.profileForm.value.direccion)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'fecha_nacimiento', this.date)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'lugar_trabajo', this.profileForm.value.trabajo)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'telefono_trabajo', this.profileForm.value.telTra)).subscribe(resp =>{
      console.log(resp)
    });
    (await this.userService.update(this.profileForm.value.dpi, 'profesion', this.profileForm.value.profesion)).subscribe(resp =>{
      console.log(resp)
    });
    await this.loadingController.dismiss();
    this.navCtrl.back();
  
  }

}
