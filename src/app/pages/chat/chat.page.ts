import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { PdfViewerPage } from '../pdf-viewer/pdf-viewer.page';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  @ViewChild('chatContainer')
  private chatContainer!: ElementRef;

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  @Input() object: any;
  @Input() page: any;
  @Input() messages: any;
  viewEntered: any;
  message: any;
  dialog: any;
  cambioHeader = true;
  datosUsuario: any;
  selectedFile!: File;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform,
              private asmsService: AsmsServiceService, private storage: Storage) { 
                this.datosUsuario = this.storage.get('datos');
              }

  scrollToBottom(): void {
    const scrollElement = this.chatContainer.nativeElement;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }
  
  ionViewDidEnter() {
    this.viewEntered = true;
    this.scrollToBottom();
    this.loadingController.dismiss();

     (this.object, this.page);
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
        setTimeout(() => {
            this.scrollToBottom();
          }, 300);
     }); 
  }

  async obtainMessagesRecursive(){
    (await this.asmsService.getMessages(this.dialog)).subscribe(async (resp: any) =>{
        if(resp.data.length !== this.messages.length ){
          this.messages =  resp.data;
          setTimeout(() => {
            this.scrollToBottom();
          }, 300);
        }
     }); 

     setTimeout(() => {
      this.obtainMessagesRecursive();
     }, 2000);
  }

  async sendMessage(){

    if(this.page === 'messages'){
      (await this.asmsService.sendMessage(this.dialog, this.message)).subscribe((resp: any)=>{
        if(resp.status){
          this.message = '';
          this.obtainMessages();
          this.obtainMessagesRecursive();
        }
      });
    }else{
      this.cambioHeader = false;
      (await this.asmsService.nuevoDialogo(this.object.tipo, this.object.codigoComunity, this.message)).subscribe((resp: any)=>{
         (resp);
         (resp);
        if(resp.status){
          this.message = '';
          this.dialog = resp.dialogo;
          this.page = 'messages';
          this.obtainMessages();
          this.obtainMessagesRecursive();
        }
      });
    }
}

triggerFileInput() {
  // Disparar el clic del input oculto
  this.fileInput.nativeElement.click();
}

async onFileSelected(event: any) {
  await this.presentLoading();
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      this.uploadImage();
    }
  }
}


uploadImage() {
  if (this.selectedFile) {
    this.asmsService.uploadFile(this.selectedFile, this.object, this.dialog);
  }
}

}

