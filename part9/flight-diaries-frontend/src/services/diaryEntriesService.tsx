import axios from "axios";
import { apiBaseUrl } from "../constants";
import { IDiaryEntry, NewDiaryEntry } from "../types";

export const getAll = async () => {
  const { data } = await axios.get<IDiaryEntry[]>(
    `${apiBaseUrl}/`
  );

  return data;
};

export const createEntry = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<NewDiaryEntry>(
    `${apiBaseUrl}/`,
    object
  );

  return data;
};
