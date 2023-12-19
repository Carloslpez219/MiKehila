import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearFamiliarPage } from './crear-familiar.page';

describe('CrearFamiliarPage', () => {
  let component: CrearFamiliarPage;
  let fixture: ComponentFixture<CrearFamiliarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearFamiliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
