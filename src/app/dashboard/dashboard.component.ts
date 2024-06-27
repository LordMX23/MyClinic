import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

  private authService = inject(AuthService);

  public user = computed(()=> this.authService.currentUser());
  public menu = computed(()=> this.authService.menuItems());

  onLogout()
  {
    this.authService.logout();
  }

}
