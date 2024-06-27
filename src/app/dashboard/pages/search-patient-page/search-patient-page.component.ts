import { Component, inject, signal } from '@angular/core';
import { PatientResponse } from '../../interfaces/patient-response.interface';
import { ClinicPatientService } from '../../services/clinic-patient.service';
import { MaterialModule } from '../../../shared/material/material.module';
import { PatientAddComponentComponent } from '../../components/patient-add-component/patient-add-component.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PatientListComponentComponent } from '../../components/patient-list-component/patient-list-component.component';

@Component({
  selector: 'app-search-patient-page',
  standalone: true,
  imports: [MaterialModule, PatientAddComponentComponent, PatientListComponentComponent],
  templateUrl: './search-patient-page.component.html',
  styles: ``
})
export default class SearchPatientPageComponent {

  private patientCTX = inject(ClinicPatientService);
  public patientData = signal<PatientResponse[]|null>(null);

  constructor(private _bottomSheet: MatBottomSheet){
    this.GetPatientAll();
  }

  openBottomSheetPatientAdd(): void {
    // const bottomSheetRef = this._bottomSheet.open(PatientAddComponentComponent, { panelClass: 'custom-width-bs' });
    const bottomSheetRef = this._bottomSheet.open(PatientAddComponentComponent);
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.GetPatientAll();
    });
  }

  GetPatientAll(): void{
    this.patientCTX.getPatientByClinicId()
    .subscribe(
      patiente => {this.patientData.set(patiente)}
    );
  }

}
