import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PremiumcalculatorService } from './premiumcalculator.service';

describe('PremiumcalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PremiumcalculatorService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([PremiumcalculatorService], (service: PremiumcalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
