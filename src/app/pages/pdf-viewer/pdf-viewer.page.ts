import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {

  @Input() pdfSrc: string  = '';
  zoom: number = 1.0; // Valor inicial del zoom
  rotation: number = 0; // Valor inicial de la rotación

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.pdfSrc)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  download(url: string) {
    window.open(url, '_system');
  }

  zoomIn() {
    this.zoom += 0.1;
    console.log("x")
  }

  zoomOut() {
    if (this.zoom > 0.1) this.zoom -= 0.1;
  }

  rotate() {
    this.rotation += 90;
    if (this.rotation >= 360) {
      this.rotation = 0;
    }
  }
}
