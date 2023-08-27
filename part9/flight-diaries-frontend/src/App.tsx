import { useState, useEffect } from "react";
import DiaryEntries from "./components/DiaryEntries";
import { getAll } from "./services/diaryEntriesService";
import DiaryEntryForm from "./components/DiaryEntryForm";
import { IDiaryEntry } from "./types";

const App = () => {
  const [entries, setEntries] = useState<IDiaryEntry[]>([]);

  useEffect(() => {
    getAll().then((data) => {
      setEntries(data);
    });
  }, []);

  return (
    <>
      <DiaryEntryForm setEntries={setEntries} />
      <DiaryEntries entries={entries} />
    </>
  );
};

export default App;
