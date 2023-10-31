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
import { ExpandMore, InsertLink, Share } from "@mui/icons-material";
import { useGetPendingMigrations } from "./useGetPendingMigrations";
import { useChain } from "@cosmos-kit/react";
import { formatToken } from "../BridgeStep/BridgeStep";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { addSeconds } from "date-fns";
import { Spinner } from "@chakra-ui/react";

export const PendingMigrationsTable = () => {
  const { address, connect, isWalletConnecting } = useChain("dydx");
  const {
    pendingMigrations,
    currentBlock,
    isLoading: loadingMigrations,
  } = useGetPendingMigrations(address);

  console.log({ pendingMigrations, currentBlock });

  return (
    <Box component="form" noValidate flexGrow={1} sx={{ mt: 0 }}>
      <Grid item xs={12}>
        {/* <Accordion style={{ borderRadius: "4px" }} expanded={true}>
          <AccordionSummary
            // onClick={() => setExpanded(!expanded)}
            // expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Pending Migrations</Typography>
          </AccordionSummary>
          <AccordionDetails> */}
        <Box sx={{ mb: 3 }} alignContent="space-between">
          {!!address && (
            <Typography>
              Pending migrations for {address.substring(0, 7)}..
              {address.substring(address.length - 6)}
            </Typography>
          )}
          <Typography>Latest block height: {currentBlock}</Typography>
        </Box>
        {loadingMigrations ? (
          <Typography>Loading Pending Migrations</Typography>
        ) : !address ? (
          <Alert
            style={{ cursor: "pointer" }}
            severity="warning"
            onClick={() => !isWalletConnecting && connect()}
          >
            Please connect your wallet to view pending migrations
          </Alert>
        ) : !pendingMigrations?.length ? (
          <Alert severity="info">
            No pending migrations for {address}. Please note that migrations
            take 30-45mins to be picked up by dYdX chain.
          </Alert>
        ) : (
          <TableContainer sx={{}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>{" "}
                  <TableCell>Est.Time Left</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingMigrations.map((pendingMigration) => {
                  const startBlock = pendingMigration.startBlock;
                  const tokenAmount = BigInt(
                    pendingMigration?.tokenAmount.toString()
                  );
                  return (
                    <TableRow key={pendingMigration.address}>
                      <TableCell>
                        {Number(
                          Number(
                            formatToken(pendingMigration.tokenAmount)
                          ).toFixed(2)
                        )}{" "}
                        DYDX
                      </TableCell>
                      <TableCell>
                        {currentBlock ? (
                          startBlock + 86400 < currentBlock ? (
                            <Typography color="green">Completed</Typography>
                          ) : (
                            <Box>
                              <Typography>
                                {formatDistanceToNowStrict(
                                  addSeconds(
                                    new Date(),
                                    (startBlock + 86400 - currentBlock) * 1.6
                                  )
                                )}
                              </Typography>
                              <div>
                                <Link
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  href={`https://www.mintscan.io/dydx/block/${
                                    startBlock + 86400
                                  }`}
                                >
                                  Block {startBlock + 86400}{" "}
                                  <InsertLink fontSize="14px" />
                                </Link>
                              </div>
                            </Box>
                          )
                        ) : (
                          "Loading Current Block Height"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {/* </AccordionDetails>
        </Accordion> */}
      </Grid>
    </Box>
  );
};
