import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {

  encuestas: any;

  constructor(private navCtrl: NavController, private asmsService: AsmsServiceService, private loadingController: LoadingController) { }

  async ngOnInit() {
    this.presentLoading();
    (await this.asmsService.getEncuestas()).subscribe((resp: any)=>{
      this.encuestas = resp.data;
      this.loadingController.dismiss();
    })
  }

  back(){
    this.navCtrl.back({animated: true});
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

}
