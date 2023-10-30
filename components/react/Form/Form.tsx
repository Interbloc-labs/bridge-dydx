import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAccount, useBalance } from "wagmi";
import { useDydxTokenAllowance, useWrappedDydxTokenRead } from "../generated";
import { AllowanceStep } from "../AllowanceStep/AllowanceStep";
import { BridgeStep } from "../BridgeStep/BridgeStep";
import { StakeStep } from "../StakeStep/StakeStep";
import { useChain } from "@cosmos-kit/react";
import { PendingMigrationsTable } from "../PendingMigrationsTable/PendingMigrationsTable";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{
        marginTop: "15px",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        gap: "3px",
        justifyContent: "center",
      }}
    >
      {/* {"Copyright "} */}
      <Link
        color="inherit"
        target="_blank"
        href="https://explorer.interbloc.org/"
        sx={{
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
          gap: "3px",
        }}
      >
        <img
          height={"18px"}
          width={"18px"}
          src={`/favicon.png`}
          alt="Interbloc logo"
        />{" "}
        Interbloc
      </Link>
      {" © "}
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

  const { data: wrappedDydxData, refetch: refetchWrappedDydxData } =
    useWrappedDydxTokenRead({
      account: address,
      args: address && [address],
    });

  const dydxBalance = useBalance({
    address: ethAddr,
    token: "0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9",
  });

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
          <img
            alt="dYdX logo"
            src="https://assets.coingecko.com/coins/images/17500/standard/hjnIm9bV.jpg?1696517040"
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bridge $DYDX
        </Typography>
        {dydxBalance.data && (
          <Typography>
            Balance {dydxBalance.data.formatted} {dydxBalance.data.symbol}
          </Typography>
        )}

        <Box>
          <Grid direction="column" container>
            <AllowanceStep
              address={ethAddr}
              onSubmit={(e) => {
                console.log("allowance submit", e);
                // allowanceRefetch();
              }}
              onAllowanceSuccess={onAllowanceSuccess}
              allowanceAmount={allowanceQuery.data}
            />

            <BridgeStep
              cosmosAddress={cosmosAddress}
              // onRecipientChange={setCosmosAddress}
              onRecipientChange={console.log}
              address={ethAddr}
              onSubmit={console.log}
              allowanceAmount={allowanceQuery.data}
              onBridgeSuccess={() => {
                console.log("bridge success");
                refetchWrappedDydxData();
                dydxBalance.refetch();
                allowanceRefetch();
              }}
            />
            <StakeStep
            // address={cosmosAddress}
            // address="dydx140l6y2gp3gxvay6qtn70re7z2s0gn57z9qaqxk"
            // onSubmit={console.log}
            />
            {/* <PendingMigrationsTable /> */}
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}
