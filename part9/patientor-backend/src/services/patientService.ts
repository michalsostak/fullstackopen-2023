import patients from "../../data/patients";
import { Entry, EntryWithoutId, NewPatient, Patient, PatientNoSsn } from "../types";
import { v1 as uuid } from "uuid";

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id == id);
  if (!patient) {
    return undefined;
  }
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    ssn: patient.ssn,
    occupation: patient.occupation,
    entries: patient.entries
  };
};

const getPatients = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, ssn, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender,
    ssn,
    occupation,
    entries
  }));
};

const getPatientsWithoutSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    return newEntry;
  }

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  getPatientById,
  addPatient,
  addEntry
};
