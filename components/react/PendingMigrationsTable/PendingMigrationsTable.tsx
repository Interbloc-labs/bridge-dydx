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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useGetPendingMigrations } from "./useGetPendingMigrations";
import { useChain } from "@cosmos-kit/react";

export const PendingMigrationsTable = () => {
  const { address } = useChain("dydx");
  const { pendingMigrations, currentBlock } = useGetPendingMigrations(address);

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
          <AccordionDetails>
            <Box alignContent="space-between">
              <Typography>Latest block height: {}</Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>{" "}
                    <TableCell>Est.Time Left</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Box>
  );
};