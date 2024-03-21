import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {

  @Input() pdfSrc: string  = '';
  @Input() titulo: any  = '';
  @Input() descripcion: any  = '';
  zoom: number = 1.0; // Valor inicial del zoom
  rotation: number = 0; // Valor inicial de la rotación

  constructor(private modalCtrl: ModalController, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.descripcion) {
      this.descripcion = this.descripcion.replace("(Ver documento adjunto)", "");
      this.getSafeComponent();
    }
     (this.pdfSrc)
  }

  getSafeComponent() {
    this.descripcion = this.sanitizer.bypassSecurityTrustHtml(this.descripcion);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  download(url: string) {
    window.open(url, '_system');
  }

  zoomIn() {
    this.zoom += 0.1;
     ("x")
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
