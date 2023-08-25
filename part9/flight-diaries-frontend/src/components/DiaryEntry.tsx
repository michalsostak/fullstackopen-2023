import { IDiaryEntry } from "../types";

interface IDiaryEntryProps {
  entry: IDiaryEntry;
}

const DiaryEntry = (props: IDiaryEntryProps) => {
  const { entry } = props;
  return (
    <div>
      <h4>
        <p>{entry.date}</p>
      </h4>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
      {entry.comment && (
        <div>
          comment: <i>{entry.comment}</i>
        </div>
      )}
    </div>
  );
};

export default DiaryEntry;
