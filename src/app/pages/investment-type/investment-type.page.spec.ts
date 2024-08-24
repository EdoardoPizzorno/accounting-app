import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentTypePage } from './investment-type.page';

describe('InvestmentTypePage', () => {
  let component: InvestmentTypePage;
  let fixture: ComponentFixture<InvestmentTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
