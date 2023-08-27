import {
  Box,
  Table,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Alert,
} from "@mui/material";
import { Diagnosis, Gender, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import EntryDetails from "./EntryDetails";
import AddPatientEntryForm from "../AddPatientEntry";

interface PatientDetailsPageProps {
  patientId?: string | null;
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({
  patientId,
  diagnoses,
}: PatientDetailsPageProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!patientId || patientId === null) {
      return;
    }

    const fetchPatientById = async (id: string) => {
      const patientById = await patientService.getPatient(id);
      setPatient(patientById);
    };
    void fetchPatientById(patientId);
  }, [patientId]);

  useEffect(() => {
    if (error !== null && error !== "") {
      setTimeout(() => setError(""), 3000);
    }
  }, [error]);

  if (!patient) {
    return <div>...loading details</div>;
  }

  return (
    <div className="App">
      <Box mt={5} mb={5}>
        <Typography align="left" variant="h4">
          {patient.name}{" "}
          {patient.gender === Gender.Male ? (
            <MaleIcon />
          ) : patient.gender === Gender.Other ? (
            <TransgenderIcon />
          ) : (
            <FemaleIcon />
          )}
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableBody>
          <TableRow>
            <TableCell>ssn</TableCell>
            <TableCell>{patient.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>occupation</TableCell>
            <TableCell>{patient.occupation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {error !== "" && <Alert severity={"error"}>{error}</Alert>}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowEntryForm(true)}
      >
        Add Entry
      </Button>
      {showEntryForm && (
        <AddPatientEntryForm
          setShowEntryForm={setShowEntryForm}
          setPatient={setPatient}
          setError={setError}
          patient={patient}
        />
      )}
      <Box mt={5} mb={5}>
        <Typography align="left" variant="h5">
          entries
        </Typography>
      </Box>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} diagnoses={diagnoses} entry={entry} />
      ))}
    </div>
  );
};

export default PatientDetailsPage;
