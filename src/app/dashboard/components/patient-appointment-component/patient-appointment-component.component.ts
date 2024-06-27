import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatDivider } from '@angular/material/divider';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PatientMedicalAppointment } from '../../interfaces/patientMedicalAppointment.interface';
import { ClinicPatientService } from '../../services/clinic-patient.service';
import Swal from 'sweetalert2'
import { FunctionsService } from '../../../shared/services/functions.service';
import { MedicResponse } from '../../interfaces/medic-response';
import { ClinicMedicService } from '../../services/clinic-medic.service';
import { CustomValidatorLabelDirective } from '../../../shared/directives/custom-validator-label.directive';

@Component({
  selector: 'app-patient-appointment-component',
  template: 'passed in {{ data.patientId }}',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, MatDivider, CustomValidatorLabelDirective],
  templateUrl: './patient-appointment-component.component.html',
  styles: ``
})
export class PatientAppointmentComponentComponent {

  private fb = inject(FormBuilder);
  private patientCTX = inject(ClinicPatientService);
  private medicCTX = inject(ClinicMedicService);
  private functiosService = inject(FunctionsService)

  public medics: MedicResponse[] = [];


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  appointmentFB = this.fb.group({
    patientId: new FormControl<number>(this.data.patientId),
    medicId: new FormControl<string>('', { nonNullable: true, validators:[Validators.required] }),
    appointmentDate: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(9), Validators.maxLength(10)] }),
    appointmentHour: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(5), Validators.maxLength(5)] }),
    reason: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(4)] }),
    // userCreate: new FormControl<string>(''),
    // catClinicId: new FormControl<number>(0),
  });

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {patientId: number}) 
  {
    //console.log("patientId: ", data.patientId);
    this.medicCTX.getMedicByClinicId()
      .subscribe(medics => this.medics = medics);
  }

  onSubmit(): void
  {
    if (this.appointmentFB.invalid){
      this.appointmentFB.markAllAsTouched();
      return;
    }

    this.patientCTX.addPatientMedicalAppointment(this.currentAppointment)
    .subscribe({
      next: ()=> {
        Swal.fire({
          icon: 'success',
          title: 'Cita agregada correctamente!',
          text: 'Cita agregada correctamente',
        })
      },
      error: (error)=> {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal!',
          text: error,
        })
      }
    });
  }

  get currentAppointment(): PatientMedicalAppointment
  {
      let medicalAppointment: PatientMedicalAppointment = this.appointmentFB.value as PatientMedicalAppointment;
      medicalAppointment.appointmentDate = this.functiosService.formatDateDDMMYYYY(new Date(medicalAppointment.appointmentDate));
      return medicalAppointment;
  }

  

}
