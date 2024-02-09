import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AsmsServiceService } from 'src/app/services/asms-service.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {

  soporteForm!: FormGroup;
  jsonString = "";

  constructor( private loadingController: LoadingController, private asmsService: AsmsServiceService,
    private navCtrl: NavController, private alertService: AlertService) { }

  ngOnInit() {
    this.loadingController.dismiss();
    this.soporteForm = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
      asunto: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required]),
    });
  }

  onlyNumbers(event: KeyboardEvent) {
    const allowedRegex = /[0-9]/;
  
    if (!allowedRegex.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  async onSubmit() {
    if (this.soporteForm.valid) {
      await this.crearJsonDeSoporte();
      (await this.asmsService.soporte(this.jsonString)).subscribe((resp: any) =>{
           (resp)
          if(resp.status){
            this.alertService.presentToast(resp.message, 'success', 3000);
          }else{
            this.alertService.presentToast(resp.message, 'danger', 3000);
          }
          this.navCtrl.back({animated: true});
        })
    }
  }

  get nombres() { return this.soporteForm.get('nombres'); }
  get mail() { return this.soporteForm.get('mail'); }
  get tel() { return this.soporteForm.get('tel'); }
  get asunto() { return this.soporteForm.get('asunto'); }
  get mensaje() { return this.soporteForm.get('mensaje'); }

  back(){
    this.navCtrl.back({animated: true});
  }

  crearJsonDeSoporte() {
    const jsonDeSoporte = {
      nombres: this.soporteForm.value.nombres,
      email: this.soporteForm.value.mail,
      telefono: this.soporteForm.value.tel,
      asunto: this.soporteForm.value.asunto,
      mensaje: this.soporteForm.value.mensaje
    };
  
    this.jsonString = JSON.stringify(jsonDeSoporte);
  }
  

}
