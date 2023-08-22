export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type PatientNoSsn = Omit<Patient, "ssn">;