import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { PdfViewerPage } from '../pdf-viewer/pdf-viewer.page';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements AfterViewChecked {
  @ViewChild('chatContainer')
  private chatContainer!: ElementRef;

  @Input() object: any;
  @Input() page: any;
  @Input() messages: any;
  viewEntered: any;
  message: any;
  dialog: any;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform,
              private asmsService: AsmsServiceService) { 
              }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const scrollElement = this.chatContainer.nativeElement;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }
  
  ionViewDidEnter() {
    this.viewEntered = true;
    this.loadingController.dismiss();

    console.log(this.object, this.page);
    if(this.page === 'messages'){
      this.dialog = this.object.dialogo;
    }
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  back(){
    this.presentLoading();
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss(true);
  }

  async mostrarModalPDF(pdf: string) {
    let pdfSrc = pdf; 
    const modal = await this.modalController.create({
      component: PdfViewerPage,
      backdropDismiss: false,
      componentProps: { pdfSrc }
    });
    await modal.present();      
  } 

  async obtainMessages(){
    (await this.asmsService.getMessages(this.dialog)).subscribe(async (resp: any) =>{
        this.messages =  resp.data;
     }); 
  }

  async sendMessage(){

    if(this.page === 'messages'){
      (await this.asmsService.sendMessage(this.dialog, this.message)).subscribe((resp: any)=>{
        if(resp.status){
          this.message = '';
          this.obtainMessages();
          setTimeout(() => {
            this.scrollToBottom();
          }, 300);
        }
      });
    }else{
      (await this.asmsService.nuevoDialogo(this.object.tipo, this.object.codigoComunity, this.message)).subscribe((resp: any)=>{
        if(resp.status){
          this.message = '';
          this.obtainMessages();
          setTimeout(() => {
            this.scrollToBottom();
          }, 300);
          this.dialog = resp.data[0].dialogo;
          this.page = 'messages';
        }
      });
    }
}

attachFile(){
  
}

}
