import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { ClinicPatientService } from '../../services/clinic-patient.service';
import { PatientMedicalAppointmentResponse } from '../../interfaces/patientMedicalAppointment-responce.interface';
import { PatientAppointmentListComponentComponent } from '../../components/patient-appointment-list-component/patient-appointment-list-component.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MaterialModule, PatientAppointmentListComponentComponent],
  templateUrl: './home-page.component.html',
  styles: ``
})
export default class HomePageComponent {

  private patientCTX = inject(ClinicPatientService);
  public PatientMedicalAppointment = signal<PatientMedicalAppointmentResponse[]|null>(null);

  constructor(){
    this.GetPatientMedicalAppointmentByClinicId();
  }

  GetPatientMedicalAppointmentByClinicId(): void{
    this.patientCTX.getPatientMedicalAppointmentByClinicId()
    .subscribe(
      patiente => {this.PatientMedicalAppointment.set(patiente)}
    );
  }

  
}
