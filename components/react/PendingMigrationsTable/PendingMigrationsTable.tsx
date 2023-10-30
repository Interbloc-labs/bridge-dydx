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
import { useGetPendingMigrations } from "./useGetPendingMigrations";
import { useChain } from "@cosmos-kit/react";

export const PendingMigrationsTable = () => {
  const { address } = useChain("dydx");
  const { pendingMigrations, currentBlock } = useGetPendingMigrations(
    "dydx1ct3qfgmx74fzkgzehun7ayusjaqv0dyc5rp300" || address
  );

  console.log({ pendingMigrations, currentBlock });

  return (
    <Box component="form" noValidate flexGrow={1} sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Accordion style={{ borderRadius: "4px" }} expanded={true}>
          <AccordionSummary
            // onClick={() => setExpanded(!expanded)}
            // expandIcon={<ExpandMore />}
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
