import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePhotoalbumPage } from './detalle-photoalbum.page';

describe('DetallePhotoalbumPage', () => {
  let component: DetallePhotoalbumPage;
  let fixture: ComponentFixture<DetallePhotoalbumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallePhotoalbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
