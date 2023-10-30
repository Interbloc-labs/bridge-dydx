import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const PendingMigrationsTable = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box component="form" noValidate flexGrow={1} sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Accordion style={{ borderRadius: "4px" }} expanded={expanded}>
          <AccordionSummary
            onClick={() => setExpanded(!expanded)}
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Pending Migrations</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </Grid>
    </Box>
  );
};
