import { Genero } from "../../shared/enums/genero.enum";
import { PatientResidency } from "./patientResidency.interface";

export interface Patient{
    name: string;
    lastName: string;
    motherLastName: string;
    birthdate: string;
    phone: string;
    gender: Genero;
    userCreate: string;
    catClinicId: number
    patientResidency: PatientResidency[];
} 