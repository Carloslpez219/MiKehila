import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

  @Input() actividad: any;
  viewEntered: any;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform) { }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.loadingController.dismiss();
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  ngOnInit() {
     (this.actividad)
  }

  back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }

}
