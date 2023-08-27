import { useState, SyntheticEvent, SetStateAction, Dispatch } from "react";
import patientService from "../../services/patients";
import {
  TextField,
  Grid,
  Button,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import {
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
} from "../../types";
import axios from "axios";

interface AddPatientEntryFormProps {
  setShowEntryForm: Dispatch<SetStateAction<boolean>>;
  setPatient: Dispatch<React.SetStateAction<Patient | null>>;
  setError: Dispatch<React.SetStateAction<string>>;
  patient: Patient;
  diagnoses: Diagnosis[];
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

interface HealthCareRatingOption {
  value: HealthCheckRating;
  label: keyof typeof HealthCheckRating;
}

const AddPatientEntryForm = ({
  setShowEntryForm,
  setPatient,
  setError,
  patient,
  diagnoses,
}: AddPatientEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState<EntryType>("Hospital");
  const [employerName, setEmployerName] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const healthcheck = Object.values(HealthCheckRating).find(
        (g) => Number(g) === value
      );
      if (healthcheck) {
        setHealthCheckRating(healthcheck as HealthCheckRating);
      }
    }
  };

  const healthCareRatingOptions: HealthCareRatingOption[] = (
    Object.keys(HealthCheckRating) as Array<keyof typeof HealthCheckRating>
  )
    .filter((key) => typeof HealthCheckRating[key] === "number")
    .map((key) => ({
      value: HealthCheckRating[key],
      label: key,
    }));

  const typeOptions: EntryTypeOption[] = [
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
    { value: "HealthCheck", label: "Health Check" },
  ];

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const newEntry = await patientService.addEntry(values, patient.id);
      const newEntries = patient.entries.concat(newEntry);
      patient.entries = newEntries;
      setPatient(patient);
      setShowEntryForm(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let newEntry: EntryWithoutId | undefined;

    switch (entryType) {
      case "Hospital":
        newEntry = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
        };
        break;
      case "HealthCheck":
        newEntry = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating as unknown as HealthCheckRating,
        };
        break;
      default:
        setError("Invalid entry type");
        break;
    }

    if (newEntry) {
      submitNewEntry(newEntry);
    }
  };

  const onCancel = () => {
    setShowEntryForm(false);
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        borderStyle: "dashed",
        margin: 2,
        padding: 1,
        paddingBottom: 7,
      }}
    >
      <Typography variant="h6" padding={2}>
        New Entry
      </Typography>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
          Entry Type
        </InputLabel>
        <Select
          label="Entry Type"
          fullWidth
          value={entryType}
          style={{ marginBottom: 40 }}
          onChange={({ target }) => setEntryType(target.value as EntryType)}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          type="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          label="Date"
          value={date}
          style={{ marginBottom: 40 }}
          InputLabelProps={{
            style: { top: "-1em" },
          }}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          style={{ marginBottom: 40 }}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          style={{ marginBottom: 40 }}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel
          id="demo-multiple-checkbox-label"
          style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}
        >
          Diagnosis codes
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          fullWidth
          value={diagnosisCodes}
          style={{ marginBottom: 40 }}
          onChange={({ target }) =>
            setDiagnosisCodes(
              Array.isArray(target.value) ? target.value : [target.value]
            )
          }
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
              <ListItemText primary={diagnosis.code} />
            </MenuItem>
          ))}
        </Select>

        {entryType === "HealthCheck" && (
          <Select
            label="Healthcheck Rating"
            fullWidth
            value={healthCheckRating}
            style={{ marginBottom: 40 }}
            onChange={onHealthCheckRatingChange}
          >
            {healthCareRatingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              style={{ marginBottom: 40 }}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel
              style={{ marginTop: 10, marginLeft: 10, marginBottom: 40 }}
            >
              Sick Leave
            </InputLabel>
            <TextField
              type="Date"
              fullWidth
              label="Sick leave start"
              value={sickLeaveStart}
              style={{ marginBottom: 40 }}
              InputLabelProps={{
                style: { top: "-1em" },
              }}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              type="Date"
              fullWidth
              label="Sick leave end"
              value={sickLeaveEnd}
              style={{ marginBottom: 40 }}
              InputLabelProps={{
                style: { top: "-1em" },
              }}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}
        {entryType === "Hospital" && (
          <>
            <InputLabel
              style={{ marginTop: 10, marginLeft: 10, marginBottom: 40 }}
            >
              Discharge
            </InputLabel>
            <TextField
              type="Date"
              fullWidth
              label="Discharge date"
              value={dischargeDate}
              style={{ marginBottom: 40 }}
              InputLabelProps={{
                style: { top: "-1em" },
              }}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              style={{ marginBottom: 40 }}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        <Grid mt={5}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ float: "right" }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddPatientEntryForm;
