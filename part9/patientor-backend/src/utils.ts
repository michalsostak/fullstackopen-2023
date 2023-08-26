import {
  Diagnosis,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
  Sickleave,
} from "./types";

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("type" in object) {
    switch (object.type) {
      case "Hospital":
        return parseHospitalEntry(object);
      case "OccupationalHealthcare":
        return parseOccupationalHealthcareEntry(object);
      case "HealthCheck":
        return parseHealthCheckEntry(object);
      default:
        throw new Error("Incorrect data: some fields are missing");
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseHospitalEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "discharge" in object
  ) {
    const newEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes:
        "diagnosesCodes" in object
          ? parseDiagnosisCodes(object.diagnosesCodes)
          : undefined,
      type: "Hospital" as const,
      discharge: parseDischarge(object.discharge),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseOccupationalHealthcareEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "employerName" in object &&
    "sickLeave" in object
  ) {
    const newEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes:
        "diagnosesCodes" in object
          ? parseDiagnosisCodes(object.diagnosesCodes)
          : undefined,
      type: "OccupationalHealthcare" as const,
      employerName: parseString(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave)
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseHealthCheckEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "healthCheckRating" in object
  ) {
    const newEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes:
        "diagnosesCodes" in object
          ? parseDiagnosisCodes(object.diagnosesCodes)
          : undefined,
      type: "HealthCheck" as const,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};


export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (entry: unknown): string => {
  if (!entry || !isString(entry)) {
    throw new Error("Incorrect or missing comment");
  }

  return entry;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (
    !object ||
    typeof object !== "object" ||
    !("criteria" in object) ||
    !("date" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  const discharge: Discharge = {
    criteria: parseString(object.criteria),
    date: parseString(object.date),
  };

  return discharge;
};

const parseSickLeave = (object: unknown): Sickleave | undefined => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    return undefined;
  }

  const sickleave: Sickleave = {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };

  return sickleave;
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating  => {
  if (!object || typeof object !== "object" || !("healthCheckRating" in object)) {
    throw new Error("Incorrect or missing data");
  }
  const check = Object.values(HealthCheckRating).includes(Number(object.healthCheckRating));
  if (!check) {
    throw new Error("Incorrect health check rating");
  } 

  return object.healthCheckRating as HealthCheckRating;
};
