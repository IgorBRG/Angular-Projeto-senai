import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './interfaces/Login.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient) {}

  login(users:Login[]): Observable<Login[]> {
    const url = 'http://localhost:3001/login';
    return this.http.post<Login[]>(url, users);
    
  }
  getVehicles(): Observable<any> {
    const url = 'http://localhost:3001/vehicles';
    return this.http.get<any>(url);
  }
  getVehicleData(vin: string): Observable<any> {
    const url = 'http://localhost:3001/vehicleData';
    return this.http.post<any>(url, { vin });

}}

  