import { useState, SyntheticEvent, SetStateAction, Dispatch } from "react";
import patientService from "../../services/patients";
import {  TextField, Grid, Button, Box, Typography } from '@mui/material';
import { EntryWithoutId, HealthCheckRating, Patient } from "../../types";
import axios from "axios";

// import { Gender } from "../../types";

interface AddPatientEntryFormProps {
  // onSubmit: (values: PatientFormValues) => void;
  setShowEntryForm: Dispatch<SetStateAction<boolean>>;
  setPatient: Dispatch<React.SetStateAction<Patient | null>>;
  setError: Dispatch<React.SetStateAction<string>>;
  patient: Patient;
}

// interface GenderOption{
//   value: Gender;
//   label: string;
// }

// const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
//   value: v, label: v.toString()
// }));

const AddPatientEntryForm = ({ setShowEntryForm, setPatient, setError, patient }: AddPatientEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // const onGenderChange = (event: SelectChangeEvent<string>) => {
  //   event.preventDefault();
  //   if ( typeof event.target.value === "string") {
  //     const value = event.target.value;
  //     const gender = Object.values(Gender).find(g => g.toString() === value);
  //     if (gender) {
  //       setGender(gender);
  //     }
  //   }
  // };

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
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    submitNewEntry({
      description,
      date,
      specialist,
      healthCheckRating: healthCheckRating as unknown as HealthCheckRating,
      diagnosisCodes,
      type: "HealthCheck"
    });
  };

  const onCancel = () => {
    setShowEntryForm(false);
  }

  return (
    <Box sx={{ borderRadius: 1, borderStyle: "dashed", margin: 2, padding: 1, paddingBottom: 7 }}>
      <Typography variant="h6" padding={2}>
        New Healtcheck Entry
      </Typography>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Healthcheck Rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
        />

        {/* <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
        {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select> */}

        <Grid>
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