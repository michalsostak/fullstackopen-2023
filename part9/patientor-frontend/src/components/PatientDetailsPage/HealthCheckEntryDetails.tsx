import { Box, List, ListItem } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getCodeDescription } from "../../utils";

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
}: HealthCheckEntryDetailsProps) => {

  const getHealthCheckIcon = (healthCheck: HealthCheckRating): JSX.Element => {
    switch (healthCheck) {
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon sx={{color: "yellow"}}/>
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon sx={{color: "orange"}}/>
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon sx={{color: "red"}}/>
      case HealthCheckRating.Healthy:
        return <FavoriteIcon sx={{color: "green"}}/>
      default:
        return <FavoriteIcon/>
    }
  };

  return (
    <Box sx={{ borderRadius: "1em", border: 2, padding: 2, margin: 2 }}>
      <div>{entry.date} <MedicalServicesIcon/></div>
      <div>
        <i>{entry.description}</i>
      </div>
      {getHealthCheckIcon(entry.healthCheckRating)}
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

export default HealthCheckEntryDetails;
