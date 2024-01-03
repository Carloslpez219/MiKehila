import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AsmsServiceService } from 'src/app/services/asms-service.service';

@Component({
  selector: 'app-crear-familiar',
  templateUrl: './crear-familiar.page.html',
  styleUrls: ['./crear-familiar.page.scss'],
})
export class CrearFamiliarPage implements OnInit {

  familiarForm!: FormGroup;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private asmsService: AsmsServiceService,
    private navCtrl: NavController, private alertService: AlertService) { }

  ngOnInit() {
    this.loadingController.dismiss();
    this.familiarForm = new FormGroup({
      dpi: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      parentesco: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onlyNumbers(event: KeyboardEvent) {
    const allowedRegex = /[0-9]/;
  
    if (!allowedRegex.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  async onSubmit() {
    if (this.familiarForm.valid) {
      console.log(this.familiarForm.value);
      (await this.asmsService.nuevofamiliar(this.familiarForm.value.dpi, this.familiarForm.value.nombres, this.familiarForm.value.apellidos,
        this.familiarForm.value.parentesco, this.familiarForm.value.tel, this.familiarForm.value.mail)).subscribe((resp: any) =>{
          console.log(resp)
          if(resp.status){
            this.alertService.presentToast(resp.message, 'success', 3000);
          }else{
            this.alertService.presentToast(resp.message, 'danger', 3000);
          }
          this.modalController.dismiss();
        })
    }
  }

  get dpi() { return this.familiarForm.get('dpi'); }
  get nombres() { return this.familiarForm.get('nombres'); }
  get apellidos() { return this.familiarForm.get('apellidos'); }
  get parentesco() { return this.familiarForm.get('parentesco'); }
  get tel() { return this.familiarForm.get('tel'); }
  get mail() { return this.familiarForm.get('mail'); }

  back(){
    this.modalController.dismiss();
  }


}
