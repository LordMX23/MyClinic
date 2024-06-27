import { Component, OnChanges, SimpleChanges, ViewChild, inject, input } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { PatientResponse } from '../../interfaces/patient-response.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CharGeneroPipe } from '../../../shared/pipes/char-genero.pipe';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PatientAppointmentComponentComponent } from '../patient-appointment-component/patient-appointment-component.component';

@Component({
  selector: 'app-patient-list-component',
  standalone: true,
  imports: [MaterialModule, MatPaginatorModule, MatTableModule, CommonModule, RouterModule, CharGeneroPipe],
  templateUrl: './patient-list-component.component.html',
  styles: ``
})
export class PatientListComponentComponent implements OnChanges {

  displayedColumns: string[] = ['Nombre', 'Telefono', 'Genero', 'Agendar'];
  dataSource = new MatTableDataSource<PatientResponse>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _bottomSheet: MatBottomSheet){
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<PatientResponse>(this.patientData());
    this.dataSource.paginator = this.paginator;
  }

  public patientData = input.required<PatientResponse[]>();


  openBottomSheetAppointmentAdd(patientId: number): void {
    // console.log({patientId});
    const bottomSheetRef = this._bottomSheet.open(PatientAppointmentComponentComponent,
      {
        data: { patientId: patientId },
      });
    bottomSheetRef.afterDismissed().subscribe(() => {
      // this.GetPatientAll();
    });
  }

  // GetPatientAll(): void{
  //   this.clinicService.getPatientAByClinicId()
  //   .subscribe(
  //     patiente => {this.patientData.set(patiente)}
  //   );
  // }

}