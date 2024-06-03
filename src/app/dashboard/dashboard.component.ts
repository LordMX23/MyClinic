import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { MenuService } from './services/menu.service';
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
export class DashboardComponent {

  private serviceMenu = inject(MenuService);
  private authService = inject(AuthService);

  public user = computed(()=> this.authService.currentUser());

  public sidebarItems = [
    {label: 'Home', icon: 'dashboard', url:'./home'},
    {label: 'Search', icon: 'search', url:'./search'},
    {label: '...', icon: 'label', url:'./home'}
  ];

  onLogout()
  {
    this.authService.logout();
  }

}
