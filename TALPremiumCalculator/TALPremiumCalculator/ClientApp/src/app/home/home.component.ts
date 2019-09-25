import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { dateValidator } from '../dateValidator';
import { PremiumInfo } from '../../models/premiumcalc';
import { PremiumcalculatorService } from '../services/premiumcalculator.service';


const DATE_REGEX = new RegExp(/^(\d{2}|\d)\/(\d{2}|\d)\/\d{4}$/);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  // The occupation list will come from the database thru a service call.
  occupationsList: any[];
  numbers: any = [45, 46, 47];
  premiumInfo: PremiumInfo;
  registerForm: FormGroup;
  premiumAmount: number;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private premiumcalcService: PremiumcalculatorService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      insuredName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      dateOfBirth: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(DATE_REGEX), dateValidator()]],
      sumInsured: ['', [Validators.required, Validators.min(0), Validators.max(10000000000)]]
    });
    console.log('1');
    this.premiumcalcService.GetOccupationList().subscribe(res => {
     // console.log(res);
      console.log('2');
      this.occupationsList = res;
    });
  }
  isFieldValid(field: string) {
    if (this.submitted) {
      return !this.registerForm.get(field).valid;
    }
    return !this.registerForm.get(field).valid && this.registerForm.get(field).touched;
  }

  calculatePremium(filterVal: any) {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.premiumInfo = this.registerForm.value;
      this.premiumInfo.factor = filterVal;

     // console.log(this.premiumInfo);
      this.premiumcalcService.CalculatePremium(this.premiumInfo).subscribe(res => {
        console.log(res);
        this.premiumAmount = res;
      });

     
    }
  }
}
