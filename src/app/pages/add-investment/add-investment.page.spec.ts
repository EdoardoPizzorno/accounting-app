import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddInvestmentPage } from './add-investment.page';

describe('AddInvestmentPage', () => {
  let component: AddInvestmentPage;
  let fixture: ComponentFixture<AddInvestmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvestmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
