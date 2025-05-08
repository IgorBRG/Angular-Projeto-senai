import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './interfaces/Login.component';
import { Vehicle, SelectedVehicleData } from './interfaces/Dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(user: Login[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  getVehicles(): Observable<{ vehicles: Vehicle[] }> {
    return this.http.get<{ vehicles: Vehicle[] }>(`${this.baseUrl}/vehicles`);
  }

  getVehicleData(vin: string): Observable<SelectedVehicleData> {
    return this.http.post<SelectedVehicleData>(`${this.baseUrl}/vehicleData`, { vin });
  }
}