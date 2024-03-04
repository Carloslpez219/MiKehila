import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamiliaresPerfilPage } from './familiares-perfil.page';

describe('FamiliaresPerfilPage', () => {
  let component: FamiliaresPerfilPage;
  let fixture: ComponentFixture<FamiliaresPerfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FamiliaresPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
