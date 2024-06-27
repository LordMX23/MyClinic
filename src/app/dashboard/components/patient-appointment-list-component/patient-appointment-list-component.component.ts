import { Component, SimpleChanges, ViewChild, input } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { PatientMedicalAppointmentResponse } from '../../interfaces/patientMedicalAppointment-responce.interface';
import { MatPaginator } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-patient-appointment-list-component',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './patient-appointment-list-component.component.html',
  styles: ``
})
export class PatientAppointmentListComponentComponent {

  displayedColumns: string[] = ['Paciente', 'Medico', 'Motivo', 'Fecha', 'Hora', 'Historial'];
  dataSource = new MatTableDataSource<PatientMedicalAppointmentResponse>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<PatientMedicalAppointmentResponse>(this.patientAppointment());
    this.dataSource.paginator = this.paginator;
  }

  public patientAppointment = input.required<PatientMedicalAppointmentResponse[]>()

}
