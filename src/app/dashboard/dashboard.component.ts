import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../interfaces/Dashboard.component';
import { SelectedVehicleData } from '../interfaces/Dashboard.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  vehicles: Vehicle[] = []; 
  selectedVehicle: SelectedVehicleData | null = null; 
  searchQuery: string = ''; 

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadVehicles(); 
  }

  loadVehicles() {
    this.apiService.getVehicles().subscribe({
      next: (response: any) => {
        this.vehicles = response.vehicles; 
        console.log('Veiculos carregados:', this.vehicles); 
      },
      error: (error) => {
        console.error('Erro ao buscar veiculos', error);
      }
    });
  }

  searchByVin() {
    const vin = this.searchQuery.trim(); 
    if (!vin) {
      console.error('VIN não pode ser vazio');
      return;
    }

    const foundVehicle = this.vehicles.find(vehicle => vehicle.vin === vin); 
    if (foundVehicle) {
      
      this.apiService.getVehicleData(vin).subscribe({
        next: (vehicleData: SelectedVehicleData) => {
          this.selectedVehicle = vehicleData; 
          console.log('Veículo encontrado:', this.selectedVehicle);
        },
        error: (error) => {
          console.error('Erro ao buscar dados do veículo:', error);
          this.selectedVehicle = null; 
        }
      });
 } else {
      console.error('Veículo não encontrado com o VIN:', vin);
      this.selectedVehicle = null; 
    }
  }

  onVehicleSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value; 
    if (selectedId) {
      const foundVehicle = this.vehicles.find(vehicle => vehicle.id.toString() === selectedId); 
      if (foundVehicle) {
        
        this.apiService.getVehicleData(foundVehicle.vin).subscribe({
          next: (vehicleData: SelectedVehicleData) => {
            this.selectedVehicle = vehicleData; 
            console.log('Veículo selecionado:', this.selectedVehicle);
          },
          error: (error) => {
            console.error('Erro ao buscar dados do veículo:', error);
            this.selectedVehicle = null; 
          }
        });
      }
    }
  }
}