import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilData: any;
  mostrarData = false;
  profileForm: FormGroup;
  departamentos: any;
  municipios: any;
  items = Array(3);
  myImage = null;
  // eslint-disable-next-line max-len
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  selectedFile!: File;

  constructor(private userService: UserService, private storage: Storage, private alertService: AlertService,
              private navCtrl: NavController, private loadingController: LoadingController, private asmsService: AsmsServiceService, private platform: Platform) {
    this.profileForm = this.createFormGroup();
  }

  isIos() {
    return this.platform.is('ios');
  }
  
  async onFileSelected(event: any) {
    await this.presentLoading();
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.myImage = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
        await this.uploadImage();
      }
    }
  }


  async uploadImage() {
    if (this.selectedFile) {
      (await this.userService.uploadProfilePicture(this.selectedFile)).subscribe((response: any) => {
          // console.log('Foto de perfil actualizada con éxito', response);
          if(response.status){
            this.alertService.presentToast(response.message, 'success', 3000);
          }else{
            this.alertService.presentToast(response.message, 'danger', 3000);
          }
          this.mostrarData = false;
          setTimeout(async () => {
            await this.loadingController.dismiss();
            this.getData();
          }, 1000);
        },
        (error: any) => {
          console.error('Error al actualizar la foto de perfil', error);
          if(error.status){
            this.alertService.presentToast(error.message, 'success', 3000);
          }else{
            this.alertService.presentToast(error.message, 'danger', 3000);
          }
          this.mostrarData = false;
          setTimeout(async () => {
            await this.loadingController.dismiss();
            this.getData();
          }, 1000);
        }
      );

    }
  }

  async ngOnInit() {
    (await this.asmsService.getDepartamentos()).subscribe((resp: any) => {
      this.departamentos = resp.data;
    });
  }

  async ionViewWillEnter() {
    this.getData();
    this.mostrarData = true;
  }

  createFormGroup() {
    return new FormGroup({
        dpi: new FormControl('', [ Validators.pattern(/^\d+$/)]),
        nombre: new FormControl('', [Validators.required]),
        nombrejudio: new FormControl('', []),
        apellido: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required, this.dateFormatValidator(/^\d{2}\/\d{2}\/\d{4}$/)]),
        momento: new FormControl('', [Validators.required]),
        // telefono: new FormControl('', [Validators.pattern(/^\d+$/)]),
        parasha: new FormControl('', []),
        celular: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
        mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
        direccion: new FormControl('', [Validators.required]),
        departamento: new FormControl('', [Validators.required]),
        municipio: new FormControl('', [Validators.required]),
        edad: new FormControl({value: '', disabled: true}, [Validators.pattern(/^\d+$/)]),
        genero: new FormControl('', [Validators.required]),
        nacionalidad: new FormControl('', [Validators.required]),
        tipoSangre: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required]),

        tipocui: new FormControl('', []),
        fechaJudia: new FormControl('', [Validators.required]),
        barMitzva: new FormControl('', []),
        fechaFallecimiento: new FormControl('', [Validators.required]),
        telcasa: new FormControl('', [Validators.pattern(/^\d+$/)]),
        trabajo: new FormControl('', []),
        teltrabajo: new FormControl('', [Validators.pattern(/^\d+$/)]),
        profesion: new FormControl('', []),
        alergia: new FormControl('', [Validators.required]),
        emergencia: new FormControl('', [Validators.required]),
        emetel: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    });
}

onlyNumbers(event: KeyboardEvent) {
  const allowedRegex = /[0-9]/;

  if (!allowedRegex.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

onlyDates(event: KeyboardEvent) {
  const allowedRegex = /^[0-9\/]*$/;

  if (!allowedRegex.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

dateFormatValidator(format: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = format.test(control.value);
    return valid ? null : {'dateFormat': {value: control.value}};
  };
}

  defaultValue( perfilData: any ){
    // console.log(perfilData)
    if(perfilData.momentoNacimiento == "dia"){
      this.profileForm.controls['momento'].setValue("antes");
    }else if(perfilData.momentoNacimiento == "noche"){
      this.profileForm.controls['momento'].setValue("despues");
    }
    if(perfilData.tipo_dpi == "DPI"){
      this.profileForm.controls['tipocui'].setValue("DPI");
    }else if(perfilData.tipo_dpi == "PASAPORTE"){
      this.profileForm.controls['tipocui'].setValue("PASAPORTE");
    }
    this.profileForm.controls['dpi'].setValue(perfilData.cui);
    this.profileForm.controls['nombre'].setValue(perfilData.nombre);
    this.profileForm.controls['nombrejudio'].setValue(perfilData.nombreJudio);
    this.profileForm.controls['apellido'].setValue(perfilData.apellido);
    this.profileForm.controls['date'].setValue(perfilData.fecha_nacimiento);
    this.profileForm.controls['parasha'].setValue(perfilData.parasha);
    this.profileForm.controls['celular'].setValue(perfilData.celular);
    this.profileForm.controls['mail'].setValue(perfilData.mail);
    this.profileForm.controls['direccion'].setValue(perfilData.direccion);
    this.profileForm.controls['departamento'].setValue(perfilData.departamento);
    this.profileForm.controls['municipio'].setValue(perfilData.municipio);
    this.profileForm.controls['edad'].setValue(perfilData.edad + " años");
    this.profileForm.controls['genero'].setValue(perfilData.genero);
    this.profileForm.controls['nacionalidad'].setValue(perfilData.nacionalidad);
    this.profileForm.controls['tipoSangre'].setValue(perfilData.tipoSangre);
    this.profileForm.controls['estado'].setValue(perfilData.estado_civil);
    this.profileForm.controls['fechaJudia'].setValue(perfilData.fechaJudia);
    this.profileForm.controls['barMitzva'].setValue(perfilData.barmitsva);
    this.profileForm.controls['fechaFallecimiento'].setValue(perfilData.fallecimiento);
    this.profileForm.controls['telcasa'].setValue(perfilData.telefono); // Se utilizaba telefono en el input pero se enviaba telcasa en la api
    this.profileForm.controls['trabajo'].setValue(perfilData.lugar_trabajo);
    this.profileForm.controls['teltrabajo'].setValue(perfilData.telefono_trabajo);
    this.profileForm.controls['profesion'].setValue(perfilData.profesion);
    this.profileForm.controls['alergia'].setValue(perfilData.alergico);
    this.profileForm.controls['emergencia'].setValue(perfilData.nombreEmergencia);
    this.profileForm.controls['emetel'].setValue(perfilData.telefonoEmergencia);
  }

  get dpi() { return this.profileForm.get('dpi'); }
  get nombre() { return this.profileForm.get('nombre'); }
  get nombrejudio() { return this.profileForm.get('nombrejudio'); }
  get apellido() { return this.profileForm.get('apellido'); }
  get date() { return this.profileForm.get('date'); }
  get momento() {
    return this.profileForm.get('momento');
  }
  get parasha() { return this.profileForm.get('parasha'); }
  get celular() { return this.profileForm.get('celular'); }
  get mail() { return this.profileForm.get('mail'); }
  get direccion() { return this.profileForm.get('direccion'); }
  get departamento() { return this.profileForm.get('departamento'); }
  get municipio() { return this.profileForm.get('municipio'); }
  get edad() { return this.profileForm.get('edad'); }
  get genero() { return this.profileForm.get('genero'); }
  get nacionalidad() { return this.profileForm.get('nacionalidad'); }
  get tipoSangre() { return this.profileForm.get('tipoSangre'); }
  get estado() { return this.profileForm.get('estado'); }

  get tipocui() { return this.profileForm.get('tipocui'); }
  get fechaJudia() { return this.profileForm.get('fechaJudia'); }
  get barMitzva() { return this.profileForm.get('barMitzva'); }
  get fechaFallecimiento() { return this.profileForm.get('fechaFallecimiento'); }
  get telcasa() { return this.profileForm.get('telcasa'); }
  get trabajo() { return this.profileForm.get('trabajo'); }
  get teltrabajo() { return this.profileForm.get('teltrabajo'); }
  get profesion() { return this.profileForm.get('profesion'); }
  get alergia() { return this.profileForm.get('alergia'); }
  get emergencia() { return this.profileForm.get('emergencia'); }
  get emetel() { return this.profileForm.get('emetel'); }

  async getData() {
    (await this.userService.getPerfil()).subscribe(async (resp: any) => {
      if(resp.status){
        this.perfilData = resp.data[0];
        this.defaultValue( this.perfilData );
        (await this.asmsService.getMunicipios(resp.data[0].departamento)).subscribe((resp: any) => {
          this.municipios = resp.data;
        });
        this.mostrarData = true;
      }else{
        this.alertService.presentToast(resp.message, 'danger', 3000);
      }
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
    let momento = "";
    if(this.profileForm.value.momento == "antes"){
      momento = "dia";
    }else if(this.profileForm.value.momento == "despues"){
      momento = "noche";
    }
    console.log(this.profileForm.value.fechaJudia);
    (await this.userService.updateFamilyMemberProfile(this.profileForm.value.dpi, this.profileForm.value.tipocui, this.profileForm.value.nombre, this.profileForm.value.apellido, this.profileForm.value.nombrejudio, this.profileForm.value.date, this.profileForm.value.fechaJudia, momento, this.profileForm.value.barMitzva, this.profileForm.value.fechaFallecimiento, this.profileForm.value.estado, this.profileForm.value.nacionalidad, this.profileForm.value.telcasa,this.profileForm.value.celular, this.profileForm.value.mail, this.profileForm.value.direccion, this.profileForm.value.departamento, this.profileForm.value.municipio, this.profileForm.value.trabajo, this.profileForm.value.teltrabajo, this.profileForm.value.profesion, this.profileForm.value.genero, encodeURIComponent(this.profileForm.value.tipoSangre), this.profileForm.value.alergia, this.profileForm.value.emergencia, this.profileForm.value.emetel, this.profileForm.value.parasha)).subscribe(async resp =>{
      console.log(resp);
      this.mostrarData = false;
      setTimeout(async () => {
        await this.loadingController.dismiss();
        this.getData();
      }, 1000);
    });
  }

  async calcularFechas(){
    let momento = "";
    if(this.profileForm.value.momento == "antes"){
      momento = "dia";
    }else if(this.profileForm.value.momento == "despues"){
      momento = "noche";
    }

    if(this.profileForm.value.momento != "" && this.profileForm.value.date != ""){
      (await this.userService.calculoDeFechas(this.profileForm.value.date, momento)).subscribe(async (resp : any) =>{
        console.log(resp.data);
        if (resp.status){
          this.profileForm.controls['fechaJudia'].setValue(resp.data.fechaJudia);
          this.profileForm.controls['edad'].setValue(resp.data.edad + " años");
          if (resp.data.parasha != ""){
            this.profileForm.controls['parasha'].setValue(resp.data.parasha);
          }
          if (resp.data.barMitzva != "" && resp.data.barMitzva != undefined){
            this.profileForm.controls['barMitzva'].setValue(resp.data.barMitzva);
          }
        }
      });
    }
  }

  async departamentoChange(ev: any){
    (await this.asmsService.getMunicipios(ev.detail.value)).subscribe((resp: any) => {
      this.municipios = resp.data;
    });
  }

}
