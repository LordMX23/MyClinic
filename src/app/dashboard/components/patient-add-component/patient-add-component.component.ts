import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genero } from '../../../shared/enums/genero.enum';
import { MaterialModule } from '../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientResidency } from '../../interfaces/patientResidency.interface';
import { ClinicPatientService } from '../../services/clinic-patient.service';
import Swal from 'sweetalert2'
import { Patient } from '../../interfaces/patient.interface';
import { FunctionsService } from '../../../shared/services/functions.service';
import { CustomValidatorLabelDirective } from '../../../shared/directives/custom-validator-label.directive';

@Component({
  selector: 'app-patient-add-component',
  standalone: true,
  imports: [FormsModule, MaterialModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, CustomValidatorLabelDirective],
  templateUrl: './patient-add-component.component.html',
  styles: ``
})
export class PatientAddComponentComponent {

  private fb = inject(FormBuilder);
  private patientCTX = inject(ClinicPatientService);
  private functiosService = inject(FunctionsService)
  

  patientFB = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(3)] }),
    lastName: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(3)] }),
    motherLastName: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(3)] }),
    birthdate: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(9), Validators.maxLength(10)] }),
    gender: new FormControl<Genero>(Genero.Vacio, { nonNullable: true, validators:[Validators.required] }),
    phone: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(10), Validators.maxLength(10)] }),
  });

  patientResidency = this.fb.group({
    address: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(10)] }),
    postalCode: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required, Validators.minLength(5), Validators.maxLength(5)] }),
    city: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(5)] }),
    state: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.minLength(5)] }),
  });

  public generos = [
    { id: 'H', desc: 'Hombre' },
    { id: 'M', desc: 'Mujer' }
  ]

  onSubmit(): void
  {
    if (this.patientFB.invalid || this.patientResidency.invalid ){
      this.patientFB.markAllAsTouched();
      this.patientResidency.markAllAsTouched();
      return;
    }

    this.patientCTX.addPatient(this.currentPatient)
    .subscribe({
      next: ()=> {
        Swal.fire({
          icon: 'success',
          title: 'Paciente agregado correctamente!',
          text: 'Paciente agregado correctamente',
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

    //console.log(this.currentPatient);
  }

  get currentPatient(): Patient
  {
      let patient: Patient = this.patientFB.value as Patient;
      patient.birthdate= this.functiosService.formatDateDDMMYYYY(new Date(patient.birthdate));
      patient.patientResidency=[this.patientResidency.value as PatientResidency];
      return patient;
  }

}
