export type PatientDataWithoutSsn = Omit<Patient, 'ssn'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnose { 
  code: string; 
  name: string; 
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}