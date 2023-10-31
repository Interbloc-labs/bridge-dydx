import { LoadingButton } from "@mui/lab";
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
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { WDYDX_CONTRACT, is0xAddress } from "../Form/Form";

import { DYDX_TOKEN_ADDRESS } from "../../../pages/_app";
import { usePrepareDydxTokenApprove } from "../generated";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";

type Props = {
  address: `0x${string}` | undefined;
  onSubmit: (allowanceAmount: bigint) => void;
  allowanceAmount: bigint | undefined;
  onAllowanceSuccess: () => void;
};

export const AllowanceStep = ({
  allowanceAmount,
  address,
  onSubmit,
  onAllowanceSuccess,
}: Props) => {
  const { open } = useWeb3Modal();
  const { connector: activeConnector, isConnected } = useAccount();
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const [expanded, setExpanded] = useState(true);
  //   const { address, isConnected, isConnecting } = useAccount();

  const [amountToBridge, setAmountToBridge] = useState<
    [amount: bigint, display: string]
  >([BigInt(0), ""]);

  const dydxBalance = useBalance({
    address: address,
    token: DYDX_TOKEN_ADDRESS,
  });
  const { config: approveConfig, ...approvalData } = usePrepareDydxTokenApprove(
    {
      chainId: 1,
      account: address,
      args: address && [WDYDX_CONTRACT, amountToBridge[0]],

      // amount: amountToBridge.toString(),
    }
  );
  const {
    data: approveData,
    write: approveWrite,
    ...writeParams
  } = useContractWrite(approveConfig);

  const approvalTx = useWaitForTransaction({ hash: approveData?.hash });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    event.preventDefault();
    !approvalData.isError && approveWrite && approveWrite();
  };

  useEffect(() => {
    allowanceAmount && expanded && setExpanded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowanceAmount]);

  const approval = approvalTx.data;
  useEffect(() => {
    if (approval && approval.status === "success") {
      onAllowanceSuccess();
      setExpanded(false);
      setAmountToBridge([BigInt(0), ""]);
    }
  }, [approval, onAllowanceSuccess]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit} //sx={{ mt: 3 }}
      flexGrow={1}
      sx={{ mt: 3 }}
    >
      <Grid item xs={12}>
        <Accordion style={{ borderRadius: "4px" }} expanded={expanded}>
          <AccordionSummary
            onClick={() => setExpanded(!expanded)}
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Create Allowance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {/* <Typography>Select the amount you want to bridge</Typography> */}
              <TextField
                fullWidth
                name="amount"
                label="Amount to Bridge"
                type="text"
                id="amount"
                autoComplete="dydx-to-bridge"
                error={amountToBridge[0] > (dydxBalance.data?.value || 0n)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Link
                        onClick={() =>
                          dydxBalance.data &&
                          setAmountToBridge([
                            dydxBalance.data.value,
                            dydxBalance.data.formatted,
                          ])
                        }
                      >
                        {"Max" +
                          (dydxBalance.isFetched &&
                          typeof dydxBalance.data !== "undefined"
                            ? ` (${dydxBalance.data.formatted} ${dydxBalance.data.symbol})`
                            : "")}
                      </Link>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "39px", height: "39px" }}
                      position="start"
                    >
                      <Image
                        height={"30"}
                        width={"30"}
                        style={{ borderRadius: "50%" }}
                        src="/dydxlogo.webp"
                        alt="$DYDX Icon"
                      />
                    </InputAdornment>
                  ),
                }}
                //   inputProps={{ type: "number" }}
                onChange={(e) => {
                  // remove all non-numeric characters from e.target.value
                  const amount =
                    e.target.value.match(/([0-9]*(\.[0-9]{0,18})?)/)?.[0] ||
                    "0";

                  let bigAmount;

                  if (amount.includes(".")) {
                    const [i, d] = amount.split(".");

                    bigAmount =
                      BigInt(i) * BigInt(1e18) + BigInt(d.padEnd(18, "0"));
                  } else {
                    bigAmount = BigInt(parseInt(amount, 10)) * BigInt(1e18);
                  }

                  console.log(e, e.target.value, {
                    bigAmount,
                    amount,
                    number: Number(amount),
                    int: parseInt(amount, 10),
                    match: e.target.value.match(
                      /([0-9]*(\.[0-9]{0,18})?)/
                    )?.[0],
                  });

                  const [int, dec] = amount.split(".");
                  const displayAmount = `${int.replace(/^00/, "0")}${
                    typeof dec === "undefined" ? "" : `.${dec}`
                  }`;

                  return setAmountToBridge([
                    bigAmount,
                    displayAmount.length === 2 &&
                    displayAmount[0] === "0" &&
                    displayAmount[1] !== "."
                      ? displayAmount[1]
                      : displayAmount,
                  ]);
                }}
                //   value={(amountToBridge / BigInt(1e18)).toString()}
                value={amountToBridge[1]}
              />
            </Box>

            {isConnected ? (
              <LoadingButton
                disabled={!amountToBridge[1]}
                loading={
                  //   approvalData.isLoading ||
                  approvalTx.isLoading || writeParams?.isLoading
                }
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Allowance Tx
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={isLoading}
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => open()}
              >
                Connect Eth Wallet to Start
              </LoadingButton>
            )}
          </AccordionDetails>
        </Accordion>

        <Box>
          {!!approvalTx.data && (
            <Alert
              severity={
                approvalTx.data.status === "success" ? "success" : "info"
              }
            >
              <Link
                target="_blank"
                referrerPolicy="no-referrer"
                href={`https://etherscan.io/tx/${approvalTx.data.transactionHash}`}
              >
                View Allowance TX on Etherscan
              </Link>
            </Alert>
          )}
        </Box>
      </Grid>
    </Box>
  );
};
