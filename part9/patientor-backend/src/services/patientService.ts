import patients from "../../data/patients";
import { Gender, NewPatient, Patient, PatientNoSsn } from "../types";
import { v1 as uuid } from "uuid";

const getPatientById = (id: string): Patient => {
  const filteredPatient = patients.filter((p) => p.id == id)[0];
  return {
    id: filteredPatient.id,
    name: filteredPatient.name,
    dateOfBirth: filteredPatient.dateOfBirth,
    gender: filteredPatient.gender as Gender,
    ssn: filteredPatient.ssn,
    occupation: filteredPatient.occupation,
    entries: filteredPatient.entries
  };
};

const getPatients = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, ssn, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
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
    gender: gender as Gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const entriesAsString : never[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { entries, ...entryRemainder } = entry;
  const newPatient = {
    id: id,
    entries: entriesAsString,
    ...entryRemainder,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  getPatientById,
  addPatient,
};
