import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AsmsServiceService } from 'src/app/services/asms-service.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  passForm!: FormGroup;

  constructor( private loadingController: LoadingController, private asmsService: AsmsServiceService,
    private navCtrl: NavController, private alertService: AlertService) { }

  ngOnInit() {
    this.loadingController.dismiss();
    this.passForm = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  async onSubmit() {
    if (this.passForm.valid) {
      (await this.asmsService.getPass(this.passForm.value.mail)).subscribe((resp: any) =>{
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

  get mail() { return this.passForm.get('mail'); }

  back(){
    this.navCtrl.back({animated: true});
  }

  goSupport(){
    this.navCtrl.navigateRoot('/soporte');
  }

}
