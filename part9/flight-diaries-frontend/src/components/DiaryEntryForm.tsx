import { useEffect, useState } from "react";
import Notification from "./Notification";
import { createEntry, getAll } from "../services/diaryEntriesService";
import { IDiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";
import { AxiosError } from "axios";

interface IDiaryEntryFormProps {
  setEntries: React.Dispatch<React.SetStateAction<IDiaryEntry[]>>
}

const DiaryEntryForm = ({ setEntries }: IDiaryEntryFormProps ) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    getAll().then((data) => {
      setEntries(data);
    });
  }, [added]);

  const handleAdd = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry: NewDiaryEntry = {
        date: date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment,
      };

      await createEntry(newEntry);

      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      setAdded(!added);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        let info = "";
        if (error instanceof AxiosError) {
          info = error.response?.data;
        }
        setError(error.message + ": " + info);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  return (
    <div>
      <h4>Add new entry</h4>
      <Notification notificationContent={error} />
      <form onSubmit={handleAdd}>
        <div>
          date:
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <div>
            visibility: great{" "}
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility("great")}
            />
            good{" "}
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility("good")}
            />
            ok{" "}
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility("ok")}
            />
            poor{" "}
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility("poor")}
            />
          </div>
          <div>
            weather: sunny{" "}
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather("sunny")}
            />
            rainy{" "}
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather("rainy")}
            />
            cloudy{" "}
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather("cloudy")}
            />
            stormy{" "}
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather("stormy")}
            />
            windy{" "}
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather("windy")}
            />
          </div>
          <div>
            comment:
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Add"></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DiaryEntryForm;
