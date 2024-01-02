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
  mostrarData = false;
  profileForm: FormGroup;
  items = Array(3);
  myImage = null;
  // eslint-disable-next-line max-len
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  selectedFile!: File;

  constructor(private userService: UserService, private storage: Storage, private alertService: AlertService,
              private navCtrl: NavController, private loadingController: LoadingController) {
    this.profileForm = this.createFormGroup();
  }

  
  async onFileSelected(event: any) {
    await this.presentLoading();
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.myImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.uploadImage();
      this.mostrarData = false;
      setTimeout(async () => {
        await this.loadingController.dismiss();
        this.getData();
      }, 1000);
    }
  }


  uploadImage() {
    if (this.selectedFile) {
      this.userService.uploadProfilePicture(this.selectedFile);
    }
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
        nombrejudio: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        momento: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
        parasha: new FormControl('', [Validators.required]),
        celular: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
        mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
        direccion: new FormControl('', [Validators.required]),
        departamento: new FormControl('', [Validators.required]),
        municipio: new FormControl('', [Validators.required]),
        edad: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}$/)]),
        genero: new FormControl('', [Validators.required]),
        nacionalidad: new FormControl('', [Validators.required]),
        tipoSangre: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required])
    });
}

onlyNumbers(event: KeyboardEvent) {
  const allowedRegex = /[0-9]/;

  if (!allowedRegex.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

formatDate(event: any) {
  let input = event.target.value;
  let lastChar = input.substr(input.length - 1);
  let formattedInput = input;

  if (!isNaN(lastChar)) {
    // Inserta '/' después de 2 y 4 dígitos
    if (input.length === 2 || input.length === 5) {
      formattedInput = input + '/';
    }
  } else {
    // Elimina el último caracter si no es un número
    formattedInput = input.slice(0, -1);
  }

  // Actualiza el valor del input
  event.target.value = formattedInput;
}

  defaultValue( perfilData: any ){
    console.log(perfilData)
    if(perfilData.momentoNacimiento == "dia"){
      this.profileForm.controls['momento'].setValue("antes");
    }else if(perfilData.momentoNacimiento == "noche"){
      this.profileForm.controls['momento'].setValue("despues");
    }
    this.profileForm.controls['dpi'].setValue(perfilData.cui);
    this.profileForm.controls['nombre'].setValue(perfilData.nombre);
    this.profileForm.controls['nombrejudio'].setValue(perfilData.nombreJudio);
    this.profileForm.controls['apellido'].setValue(perfilData.apellido);
    this.profileForm.controls['date'].setValue(perfilData.fecha_nacimiento);
    this.profileForm.controls['telefono'].setValue(perfilData.telefono);
    this.profileForm.controls['parasha'].setValue(perfilData.parasha);
    this.profileForm.controls['celular'].setValue(perfilData.celular);
    this.profileForm.controls['mail'].setValue(perfilData.mail);
    this.profileForm.controls['direccion'].setValue(perfilData.direccion);
    this.profileForm.controls['departamento'].setValue(perfilData.departamento);
    this.profileForm.controls['municipio'].setValue(perfilData.municipio);
    this.profileForm.controls['edad'].setValue(perfilData.edad);
    this.profileForm.controls['genero'].setValue(perfilData.genero);
    this.profileForm.controls['nacionalidad'].setValue(perfilData.nacionalidad);
    this.profileForm.controls['tipoSangre'].setValue(perfilData.tipoSangre);
    this.profileForm.controls['estado'].setValue(perfilData.estado_civil);
  }

  get dpi() { return this.profileForm.get('dpi'); }
  get nombre() { return this.profileForm.get('nombre'); }
  get nombrejudio() { return this.profileForm.get('nombrejudio'); }
  get apellido() { return this.profileForm.get('apellido'); }
  get date() { return this.profileForm.get('date'); }
  get momento() {
    return this.profileForm.get('momento');
  }
  get telefono() { return this.profileForm.get('telefono'); }
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

  async getData() {
      (await this.userService.getPerfil()).subscribe((resp: any) => {
        if(resp.status){
          this.perfilData = resp.data[0];
          this.defaultValue( this.perfilData );
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
    (await this.userService.updateFamilyMemberProfile(this.profileForm.value.dpi, 'DPI', this.profileForm.value.nombre, this.profileForm.value.apellido, this.profileForm.value.nombrejudio, this.profileForm.value.date, this.profileForm.value.date, momento, this.profileForm.value.date, "", this.profileForm.value.estado, this.profileForm.value.nacionalidad, this.profileForm.value.telefono, this.profileForm.value.celular, this.profileForm.value.mail, this.profileForm.value.direccion, this.profileForm.value.departamento, this.profileForm.value.municipio, '', '', '', this.profileForm.value.genero, this.profileForm.value.tipoSangre, '', '', '', this.profileForm.value.parasha )).subscribe(async resp =>{
      console.log(resp);
      this.mostrarData = false;
      setTimeout(async () => {
        await this.loadingController.dismiss();
        this.getData();
      }, 1000);
    });
  }

}
