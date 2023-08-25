import { IDiaryEntry } from "../types";
import DiaryEntry from "./DiaryEntry";

interface IDiaryEntriesProps {
  entries: IDiaryEntry[];
}

const DiaryEntries = (props: IDiaryEntriesProps) => (
  <>
    <h3>Diary entries</h3>
    {props.entries.map((entry) => (
      <DiaryEntry key={entry.id} entry={entry} />
    ))}
  </>
);

export default DiaryEntries;
