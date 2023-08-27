import { Diagnosis } from "./types";

export const getCodeDescription = (code: string, diagnoses: Diagnosis[]): string => {
  const foundCode = diagnoses.find((d) => d.code === code);
  if (!foundCode) {
    return "no code description";
  }
  return foundCode.name;
};