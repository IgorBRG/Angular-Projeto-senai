import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = []; 
  selectedVehicle: any; 

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

  onVehicleSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const vehicleId = selectElement.value;

    
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === +vehicleId);
    
    if (selectedVehicle) {
      
      const vin = selectedVehicle.vin; 

      
      console.log('VIN se comunica com a API:', vin);

      this.apiService.getVehicleData(vin).subscribe({
        next: (vehicleData) => {
          this.selectedVehicle = vehicleData; 
          console.log('Data do veiculo buscado com sucesso:', vehicleData); 
        },
        error: (error) => {
          console.error('erro ao buscar a data do veiculo', error);
        }
      });
    } else {
      console.error('Veiculo não encontrado com o ID:', vehicleId);
    }
  }
}