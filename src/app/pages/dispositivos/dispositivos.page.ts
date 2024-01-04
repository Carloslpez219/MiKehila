import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit {

  dispositivos: any;

  constructor(private navCtrl: NavController, private loadingController: LoadingController, private asmsService: AsmsServiceService) { }

  async ngOnInit() {
    this.presentLoading();
    (await this.asmsService.getDispositivos()).subscribe((resp: any)=>{
      console.log(resp)
      this.dispositivos = resp.data;
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
