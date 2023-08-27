import { Box, List, ListItem } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { getCodeDescription } from "../../utils";

interface OccupationalHealthcareEntryDetailsProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryDetailsProps) => {


  return (
    <Box sx={{ borderRadius: "1em", border: 2, padding: 2, margin: 2 }}>
      <div>
        {entry.date} <WorkIcon /> {entry.employerName}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.sickLeave && (
        <div>
          <div>sickleave start date {entry.sickLeave?.startDate}</div>
          <div>sickleave end date {entry.sickLeave?.endDate}</div>
        </div>
      )}
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

export default OccupationalHealthcareEntryDetails;
