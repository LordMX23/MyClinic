import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  private authService = inject(AuthService);

  constructor() { }

  //* Getters para extraer propiedades del usuario
  getClinicIdByUserToken(accessToken: String): number {

    const cliniId: string = this.authService.currentUser()?.ClinicId!;
    return Number(cliniId);

  }

  getUserByUserToken(accessToken: String): string {

    const user: string = this.authService.currentUser()?.Email!;
    return user;

  }

  //* Formatear fecha a YYYY-MM--dd

  formatDateDDMMYYYY(date: Date): string {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  
}
