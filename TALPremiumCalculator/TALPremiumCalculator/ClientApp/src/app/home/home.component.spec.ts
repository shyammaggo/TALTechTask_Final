import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { FieldErrorDisplayComponentComponent } from '../field-error-display-component/field-error-display-component.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PremiumcalculatorService } from '../services/premiumcalculator.service';
import { NumberToWordsPipePipe } from '../number-to-words-pipe.pipe';

describe('homeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [HomeComponent, FieldErrorDisplayComponentComponent, NumberToWordsPipePipe ],
      providers: [PremiumcalculatorService, { provide: Router }]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a form with four controls', () => {
    expect(component.registerForm.contains('insuredName')).toBeTruthy();
    expect(component.registerForm.contains('age')).toBeTruthy();
    expect(component.registerForm.contains('dateOfBirth')).toBeTruthy();
    expect(component.registerForm.contains('sumInsured')).toBeTruthy();

  });

  it('should make the name control required', () => {
    let control = component.registerForm.get('insuredName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should check for min and max range value', () => {
    let control = component.registerForm.get('age');
    control.setValue(-1);
    expect(control.valid).toBeFalsy();
  });

  it('should make the dateOfBirth control required', () => {
    let control = component.registerForm.get('dateOfBirth');
    control.setValue(-1);
    expect(control.valid).toBeFalsy();
  });

  it('should make the sumInsured control required', () => {
    let control = component.registerForm.get('sumInsured');
    control.setValue(-1);
    expect(control.valid).toBeFalsy();
  });

  it('should call calculatePremium method on change', () => {
    spyOn(component, 'calculatePremium');
    let select = fixture.debugElement.query(By.css('#occupationList')).nativeElement;
    select.dispatchEvent(new Event('change'));    fixture.detectChanges();    expect(component.calculatePremium).toHaveBeenCalled();
  });


});

