import { Box, Table, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { Gender, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from "../../services/patients";
import { useEffect, useState } from 'react';

interface PatientDetailsPageProps {
  patientId? : string | null
}

const PatientDetailsPage = ({ patientId } : PatientDetailsPageProps ) => {

  const [patient, setPatient ] = useState<Patient | null>(null)
  
  useEffect(() => {
    if (!patientId || patientId === null) {
      return;
    }

    const fetchPatientById = async (id: string) => {
      const patientById = await patientService.getPatient(id);
      setPatient(patientById)
    };
    void fetchPatientById(patientId);
  }, [patientId]);


  if (!patient) {
    return <div>...loading details</div>
  }

  return (
    <div className="App">
      <Box mt={5}>
        <Typography align="left" variant="h4">
          {patient.name} { patient.gender === Gender.Male ? <MaleIcon /> : ( patient.gender === Gender.Other ? <TransgenderIcon />: <FemaleIcon />)}
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
    </div>
  );
};

export default PatientDetailsPage;
