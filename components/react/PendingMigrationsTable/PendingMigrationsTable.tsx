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
  const { pendingMigrations, currentBlock } = useGetPendingMigrations(
    "dydx1ct3qfgmx74fzkgzehun7ayusjaqv0dyc5rp300" || address
  );
  const blockCalculation = pendingMigrations.map((block) =>
    block.startBlock + 86400 > currentBlock ? "Completed" : "1hr"
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
          <AccordionDetails>
            <Box sx={{ mb: 3 }} alignContent="space-between">
              <Typography>Latest block height: {currentBlock}</Typography>
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
                  {pendingMigrations.map((block) => {
                    const startBlock = block.startBlock;
                    const tokenAmount = BigInt(block?.tokenAmount);
                    return (
                      <TableRow key={block.address}>
                        <TableCell>{tokenAmount}</TableCell>
                        <TableCell>
                          {currentBlock && startBlock + 86400 > currentBlock ? (
                            <Typography>Completed</Typography>
                          ) : (
                            <>{(86400 - startBlock) * 1.6}</>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Box>
  );
};
