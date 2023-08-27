import { Box, List, ListItem } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Diagnosis, HospitalEntry } from "../../types";
import { getCodeDescription } from "../../utils";

interface HospitalEntryDetailsProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryDetailsProps) => {

  return (
    <Box sx={{ borderRadius: '1em', border: 2, padding: 2, margin: 2 }}>
      <div>{entry.date} <CheckBoxIcon/></div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>discharge date {entry.discharge.date}</div>
      <div>discharge criteria {entry.discharge.criteria}</div>
      <div>diagnose by {entry.specialist}</div>
      <List
        sx={{
          listStyleType: "disc",
          listStylePosition: "inside",
        }}
      >
        {entry.diagnosisCodes?.map((code) => (
          <ListItem key={code} sx={{ display: "list-item" }}>
            {code} {getCodeDescription(code, diagnoses)}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HospitalEntryDetails;
