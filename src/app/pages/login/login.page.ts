import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, LoadingController} from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';
import { MenuController } from '@ionic/angular';
import { PushNotifications, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { Capacitor } from '@capacitor/core';
import { combineLatest, of } from 'rxjs';
import { map, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  registroForm: FormGroup;
  registro = false;
  inicio = true;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private navCtrl: NavController, private userService: UserService, public loadingController: LoadingController,
              private alertService: AlertService,  private storage: Storage, private menu: MenuController, private service: AsmsServiceService, private platform: Platform) {
                this.loginForm = this.createFormGroup();
                this.registroForm = this.createFormGroupRegistro();
              }


              ngOnInit() {
                const dpi$ = this.registroForm.get('dpi')?.valueChanges.pipe(debounceTime(500)) ?? of(null);
                const mail$ = this.registroForm.get('mail')?.valueChanges.pipe(debounceTime(500)) ?? of(null);
                const celular$ = this.registroForm.get('celular')?.valueChanges.pipe(debounceTime(500)) ?? of(null);
              
                combineLatest([dpi$, mail$, celular$]).pipe(
                  filter(([dpi, mail, celular]) => 
                    (dpi && dpi.length === 13 && this.registroForm.get('dpi')?.valid) &&
                    (mail && this.registroForm.get('mail')?.valid) &&
                    (celular && this.registroForm.get('celular')?.valid)
                  )
                ).subscribe(async ([dpi, mail, celular]) => {
                  (await this.userService.buscaCUI(dpi, mail, celular)).subscribe(
                    (response: any) => {
                      console.log('Response', response);
                      if (!response.status) {
                        this.alertService.presentAlert(response.message);
                        this.registroForm.reset();
                      }
                    },
                    (error: any) => {
                      if (!error.status) {
                        this.alertService.presentAlert(error.message);
                        this.registroForm.reset();
                      }
                    }
                  );
                });
              }
              

  onlyNumbers(event: KeyboardEvent) {
    const allowedRegex = /[0-9]/;
  
    if (!allowedRegex.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
  
  ionViewDidLeave() {
    this.menu.enable(true);
  }  

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  createFormGroupRegistro() {
    return new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dpi: new FormControl('', [Validators.pattern(/^\d+$/)]),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      celular: new FormControl('', [Validators.pattern(/^\d+$/)]),
    });
  }

  get nombre() { return this.loginForm.get('nombre'); }
  get password() { return this.loginForm.get('password'); }

  get nombres() { return this.registroForm.get('nombres'); }
  get apellidos() { return this.registroForm.get('apellidos'); }
  get dpi() { return this.registroForm.get('dpi'); }
  get mail() { return this.registroForm.get('mail'); }
  get celular() { return this.registroForm.get('celular'); }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async login(){
      this.presentLoading();
      const id = await Device.getId();
      const valid = await this.userService.login(this.loginForm.value.nombre, this.loginForm.value.password);
      if (valid){
        const valido = await this.service.validarDispositivo(id.identifier);
        if (valido) {
          
          await this.loadingController.dismiss();
          this.navCtrl.navigateRoot('/');
        } else {
          await this.loadingController.dismiss();
          this.alertService.presentToast('Este dispositivo se encuentra bloquedo por el usuario.', 'danger', 3000);
          this.loginForm.reset();
          this.storage.clear();
        }
      }else{
        this.loadingController.dismiss();
        const message = 'Usuario y/o Contraseña son incorrectos';
        this.alertService.presentToast(message, 'dark', 3000);
        this.loginForm.reset();
        this.storage.clear();
      }
  }

  async crearCuenta(){
    this.presentLoading();
    (await this.userService.registro(this.registroForm.value.dpi, this.registroForm.value.mail, this.registroForm.value.nombres, this.registroForm.value.apellidos))
      .subscribe((resp: any) => {
        if(resp.status){
          this.alertService.presentToast(resp.message, 'success', 4000);
        }else{
          this.alertService.presentToast(resp.message, 'danger', 3000);
        }
        this.loadingController.dismiss();
        this.registroForm.reset();
        this.gologin();
      })
  }

  goCrear(){
    this.registro = true;
    this.inicio = false;
  }

  gologin(){
    this.registro = false;
    this.inicio = true;
  }

}

