import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamilairesPage } from './familaires.page';

describe('FamilairesPage', () => {
  let component: FamilairesPage;
  let fixture: ComponentFixture<FamilairesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FamilairesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
