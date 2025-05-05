import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    
    this.router.navigateByUrl('');
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
 
}