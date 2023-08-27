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
    throw new Error("Incorrect or missing hospital entry data");
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
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object)
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
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object)
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
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object)
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
    "occupation" in object
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

const isNumber = (num: unknown): num is number => {
  return !isNaN(Number(num));
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (entry: unknown): string => {
  if (!entry || !isString(entry)) {
    throw new Error("Problem parsing string or a missing comment");
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
    throw new Error("Incorrect or missing discharge data");
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
  if (!object || !isNumber(object)) {
    throw new Error("Incorrect number format for health check rating or missing health check");
  }
  const healthcheckAsNumber = Number(object);
  const check = Object.values(HealthCheckRating).includes(healthcheckAsNumber);
  if (!check) {
    throw new Error("Incorrect health check rating, must be between 0 and 3");
  }

  const healthCheck = healthcheckAsNumber as unknown as HealthCheckRating;

  return healthCheck;
};
