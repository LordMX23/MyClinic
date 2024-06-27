import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FunctionsService } from '../../shared/services/functions.service';
import { MedicResponse } from '../interfaces/medic-response';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicMedicService {
  
  //! Propiedades privadas
  private readonly clinicBaseUrl: string = environment.clinicBaseUrl;
  private http = inject(HttpClient);
  private functiosService = inject(FunctionsService);

  constructor() { }

  getMedicByClinicId(): Observable<MedicResponse[]> {
    const token = localStorage.getItem('token');
    const url = `${this.clinicBaseUrl}/SelectMedicByClinicId?clinicId=${this.functiosService.getClinicIdByUserToken(token!)}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MedicResponse[]>(url, { headers })
      .pipe(
        catchError((error) => {
          throw `Error: ${error.toString()}`;
        })
      );
  }
}
