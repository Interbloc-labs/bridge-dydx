import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import {
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  useAccount,
  useBalance,
  useContractWrite,
  useFeeData,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWatchPendingTransactions,
} from "wagmi";
import {
  usePrepareWrappedDydxTokenApprove,
  usePrepareWrappedDydxTokenBridge,
  useDydxTokenAllowance,
  useWrappedDydxTokenApprovalEvent,
  useWrappedDydxTokenRead,
} from "../generated";

import { ethToDydx } from "../../utils/ethToDydx";
import { toHex } from "viem";
import { ReceiverAddressInput } from "../ReceiverAddressInput/ReceiverAddressInput";
import { useEffect } from "react";
import { Check, CheckCircle } from "@mui/icons-material";
import { Alert, LoadingButton } from "@mui/lab";
import { Accordion } from "@mui/material";
import { AllowanceStep } from "../AllowanceStep/AllowanceStep";
import { BridgeStep } from "../BridgeStep/BridgeStep";
import { StakeStep } from "../StakeStep/StakeStep";
import { useChain } from "@cosmos-kit/react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        href="https://explorer.interbloc.org/"
      >
        Interbloc
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const WDYDX_CONTRACT = "0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9";

export const is0xAddress = (value: string): value is `0x${string}` =>
  /^0x[a-fA-F0-9]{40}$/.test(value);

type Props = {};

export default function Form({}: Props) {
  const { address: cosmosAddress } = useChain("dydx");

  const { address, isConnected, isConnecting } = useAccount();
  const ethAddr: `0x${string}` | undefined =
    address && is0xAddress(address) ? address : undefined;
  // const [cosmosAddress, setCosmosAddress] = React.useState<string>(
  //   ethAddr ? ethToDydx(ethAddr) : ""
  // );
  const { refetch: allowanceRefetch, ...allowanceQuery } =
    useDydxTokenAllowance({
      account: address,
      args: address && [address, WDYDX_CONTRACT],

      // args: ethAddr && [ethAddr, DYDX_TOKEN_ADDRESS],
    });

  //   const dydxBalance = useBalance({
  //     address: ethAddr,
  //     token: DYDX_TOKEN_ADDRESS,
  //   });
  // const ethBalance = useBalance({
  //   address: ethAddr,
  // });

  // useEffect(() => {
  //   if (ethAddr) {
  //     setCosmosAddress(ethToDydx(ethAddr));
  //   } else setCosmosAddress("");
  // }, [ethAddr]);

  //   const dydxTokenRead = useWrappedDydxTokenAllowance({
  //     account: ethAddr,
  //     args: ethAddr && [ethAddr, WDYDX_CONTRACT],
  //     // args: ethAddr && [ethAddr, DYDX_TOKEN_ADDRESS],
  //   });

  //   const { config: approveConfig, ...approvalData } =
  //     usePrepareWrappedDydxTokenApprove({
  //       chainId: 1,
  //       account: ethAddr,
  //       args: ethAddr && [WDYDX_CONTRACT, amountToBridge[0]],

  //       // amount: amountToBridge.toString(),
  //     });

  //   const {
  //     data: approveData,
  //     write: approveWrite,
  //     ...writeParams
  //   } = useContractWrite(approveConfig);

  //   const approvalTx = useWaitForTransaction({ hash: approveData?.hash });

  //   useWatchPendingTransactions({
  //     listener: (hashes) => console.log("hashes", hashes),
  //   });

  const feeData = useFeeData();

  //   approveConfig.request &&
  //     console.log(
  //       approveConfig.request.gasPrice,
  //       approveConfig.request.gas,
  //       approveConfig.request.maxFeePerGas,
  //       approveConfig.request.maxPriorityFeePerGas
  //     );

  console.log({
    // amountToBridge,
    // approveConfig,
    address,
    // balance,
    // balanceData: dydxBalance.data,
    feeData,
    // approvalData,
    // approveData,
    // approveWrite,
    // dydxTokenRead,
    // writeParams,
    // tx: approvalTx,
    // chainContext,
    allowanceRefetching: allowanceQuery.isRefetching,
  });

  //   const { config: bridgeConfig } = usePrepareWrappedDydxTokenBridge({
  //     chainId: 1,
  //     account: ethAddr,
  //     args:
  //       ethAddr && cosmosAddress
  //         ? [amountToBridge[0], toHex(cosmosAddress), toHex("")]
  //         : undefined,
  //   });

  const onAllowanceSuccess = React.useCallback(() => {
    console.log("allowance success callback called, refetching allowance");
    allowanceRefetch();
  }, [allowanceRefetch]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bridge $DYDX
        </Typography>

        <Box>
          <Grid container>
            <AllowanceStep
              address={ethAddr}
              onSubmit={(e) => {
                console.log("allowance submit", e);
                // allowanceRefetch();
              }}
              onAllowanceSuccess={onAllowanceSuccess}
              allowanceAmount={allowanceQuery.data}
            />
            {/* <Grid item xs={12}>
                <ReceiverAddressInput
                  value={cosmosAddress}
                  onChange={setCosmosAddress}
                />
              </Grid> */}
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            <BridgeStep
              cosmosAddress={cosmosAddress}
              // onRecipientChange={setCosmosAddress}
              onRecipientChange={console.log}
              address={ethAddr}
              onSubmit={console.log}
              allowanceAmount={allowanceQuery.data}
            />
            <StakeStep
              address={cosmosAddress}
              // address="dydx140l6y2gp3gxvay6qtn70re7z2s0gn57z9qaqxk"

              onSubmit={console.log}
            />
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}
