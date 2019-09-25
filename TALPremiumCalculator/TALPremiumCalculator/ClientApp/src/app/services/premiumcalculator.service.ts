
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Occupation, PremiumInfo } from '../../models/premiumcalc';

@Injectable({
  providedIn: 'root'
})
export class PremiumcalculatorService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'content-type': 'application/json' });
  }

  GetOccupationList(): Observable<Occupation[]> {
    console.log('3');
    return this.http.get<Occupation[]>(environment.apiAddress + '/PremiumCalculator/GetOccupationList');
  }
  CalculatePremium(info: PremiumInfo): Observable<any> {
    return this.http.post<any>(environment.apiAddress + '/PremiumCalculator/CalculatePremium',
     JSON.stringify(info), { headers: this.headers });
  }
}
