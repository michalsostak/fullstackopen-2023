import patients from "../../data/patients";
import { Patient, PatientNoSsn } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getPatientsWithoutSsn,
};
