import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleEncuestaPage } from './detalle-encuesta.page';

describe('DetalleEncuestaPage', () => {
  let component: DetalleEncuestaPage;
  let fixture: ComponentFixture<DetalleEncuestaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleEncuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
