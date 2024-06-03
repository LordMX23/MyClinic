import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../interfaces/menuItems.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menuItems = signal<MenuItem[]>([
    { label: 'Home', icon: 'dashboard', url: './home' },
    { label: 'Search', icon: 'search', url: './search' },
    { label: '...', icon: 'label', url: './home' }
]);

  constructor() { }
}
