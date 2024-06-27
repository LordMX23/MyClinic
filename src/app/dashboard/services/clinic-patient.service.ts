import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PatientResponse } from '../interfaces/patient-response.interface';
import { Patient } from '../interfaces/patient.interface';
import { PatientMedicalAppointment } from '../interfaces/patientMedicalAppointment.interface';
import { PatientMedicalAppointmentResponse } from '../interfaces/patientMedicalAppointment-responce.interface';
import { FunctionsService } from '../../shared/services/functions.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicPatientService {

  //! Propiedades privadas
  private readonly clinicBaseUrl: string = environment.clinicBaseUrl;
  private http = inject(HttpClient);
  private functiosService = inject(FunctionsService);

  constructor() { }

  getPatientByClinicId(): Observable<PatientResponse[]> {
    const token = localStorage.getItem('token');
    const url = `${this.clinicBaseUrl}/SelectPatientByClinicId?clinicId=${this.functiosService.getClinicIdByUserToken(token!)}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<PatientResponse[]>(url, { headers })
      .pipe(
        catchError((error) => {
          throw `Error: ${error.toString()}`;
        })
      );
  }

  addPatient(patient: Patient): Observable<number> {
    const token = localStorage.getItem('token');
    const url = `${this.clinicBaseUrl}/CreatePatient`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    patient.userCreate = this.functiosService.getUserByUserToken(token!);
    patient.catClinicId = this.functiosService.getClinicIdByUserToken(token!)
    patient.patientResidency[0].catClinicId = this.functiosService.getClinicIdByUserToken(token!);


    const body = patient;

    return this.http.post<number>(url, body, { headers })
      .pipe(
        catchError(error => {
          console.log(error);
          throw `Error: ${error.error.detail}`;
        })
      );

  }

  addPatientMedicalAppointment(patientMedicalAppointment: PatientMedicalAppointment): Observable<number> {
    const token = localStorage.getItem('token');
    const url = `${this.clinicBaseUrl}/CreatePatientMedicalAppointment`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    patientMedicalAppointment.userCreate = this.functiosService.getUserByUserToken(token!);
    patientMedicalAppointment.catClinicId = this.functiosService.getClinicIdByUserToken(token!)


    const body = patientMedicalAppointment;

    return this.http.post<number>(url, body, { headers })
      .pipe(
        catchError(error => {
          console.log(error);
          throw `Error: ${error.error.detail}`;
        })
      );

  }

  getPatientMedicalAppointmentByClinicId(): Observable<PatientMedicalAppointmentResponse[]> {
    const token = localStorage.getItem('token');
    const url = `${this.clinicBaseUrl}/SelectPatientMedicalAppointmentByClinicId?clinicId=${this.functiosService.getClinicIdByUserToken(token!)}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<PatientMedicalAppointmentResponse[]>(url, { headers })
      .pipe(
        catchError((error) => {
          throw `Error: ${error.toString()}`;
        })
      );
  }



  



}