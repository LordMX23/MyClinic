export interface PatientMedicalAppointmentResponse{
    patientMedicalAppointmentId: number,
    patientId: number;
    patientName: string;
    medicId: string;
    medicName: string
    appointmentDate: string
    appointmentHour: string;
    reason: string;
    catClinicId: number;
}