import patients from "../../data/patients";
import { Gender, NewPatient, Patient, PatientNoSsn } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, ssn, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    ssn,
    occupation,
  }));
};

const getPatientsWithoutSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient
};
