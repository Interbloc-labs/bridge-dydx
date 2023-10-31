import { ExpandMore, Pending } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
// import { cosmos } from "osmojs";
import { useCallback, useEffect, useState } from "react";
import { StargateClient } from "@cosmjs/stargate";
import { LoadingButton } from "@mui/lab";
import { useChain } from "@cosmos-kit/react";
import { cosmos, osmosis } from "osmojs";
import { PendingMigrationsTable } from "../PendingMigrationsTable/PendingMigrationsTable";
import { ValidatorSelect } from "../ValidatorSelect/ValidatorSelect";
import Image from "next/image";

type Props = {
  // address: string | undefined;
  // onSubmit: (allowanceAmount: bigint) => void;
};

export const StakeStep = ({}: Props) => {
  const {
    isWalletConnected,
    isWalletConnecting,
    connect,
    getSigningStargateClient,
    address,
  } = useChain("dydx");
  const [expanded, setExpanded] = useState(false);
  //   const [client, setClient] =
  //     useState<Awaited<ReturnType<typeof createRPCQueryClient>>>();
  const [client, setClient] = useState<StargateClient>();
  const [txHash, setTxHash] = useState<string>();

  const [userBalance, setUserBalance] = useState<bigint>(BigInt(0));
  const [amountToDelegate, setAmountToDelegate] = useState<
    [amount: bigint, display: string]
  >([BigInt(0), ""]);
  const [selectedValidator, setSelectedValidator] = useState<string>(
    "dydxvaloper15004ysvmqnqzkvt7x6s4cd53flmmvgfvyqk90h"
  );
  const [signingAndBroadcasting, setSigningAndBroadcasting] = useState(false);

  useEffect(() => {
    (async () => {
      const client = await StargateClient.connect(
        "https://rpc.cosmos.directory/dydx"
      );
      // await createRPCQueryClient({
      //   rpcEndpoint: "https://rpc.cosmos.directory/dydx",
      // });

      setClient(client);
    })();
  }, []);

  useEffect(() => {
    client &&
      address &&
      client.getBalance(address, "adydx").then((res) => {
        Number(res.amount) > 0 && setExpanded(true);
        console.log("balalnce", res);
        return setUserBalance(BigInt(res.amount));
      });
    // client.cosmos.bank.v1beta1
    //   .balance({
    //     address,
    //     denom: "adydx",
    //   })
    //   .then((res) => {
    //     Number(res.balance.amount) > 0 && setExpanded(true);
    //     return setUserBalance(BigInt(res.balance.amount));
    //   });
  }, [client, address]);

  const displayTokens = Number(
    (userBalance / BigInt(1e18)).toString() +
      "." +
      userBalance.toString().substring(userBalance.toString().length - 18)
  ).toFixed(2);

  const onSubmit = useCallback(
    async (delegationAmount: bigint) => {
      if (!address) return;
      setSigningAndBroadcasting(true);
      const client = await getSigningStargateClient();

      const value = cosmos.staking.v1beta1.MsgDelegate.fromPartial({
        delegatorAddress: address,
        validatorAddress: selectedValidator,
        amount: {
          denom: "adydx",
          amount: delegationAmount.toString(),
        },
      });
      const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value,
      };

      await client
        .signAndBroadcast(address, [msg], "auto", "Stake DYDX")
        .then((res) => {
          console.log(res);
          setTxHash(res.transactionHash);
        });
      setSigningAndBroadcasting(false);
    },
    [address, getSigningStargateClient, selectedValidator]
  );

  return (
    <Box gap={"small"} flexGrow={1} sx={{ mt: 3 }}>
      <Accordion
        style={{ borderRadius: "4px" }}
        // expanded={expanded}
        expanded
      >
        <AccordionSummary
          onClick={() => setExpanded(!expanded)}
          // expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          //   justifyContent="space-between"
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            flexGrow={1}
          >
            <Typography>Stake</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ marginBottom: 2 }}>
            <PendingMigrationsTable />
          </Box>

          <Box sx={{ columnGap: 2 }}>
            <Chip
              sx={{ mb: 1, justifySelf: "flex-end" }}
              label={`${displayTokens} DYDX Available`}
            />
            <TextField
              error={amountToDelegate[0] > userBalance}
              fullWidth
              name="amount"
              label="Amount to Stake"
              type="text"
              id="amount"
              autoComplete="dydx-to-bridge"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Link
                      onClick={() =>
                        userBalance &&
                        setAmountToDelegate([userBalance, displayTokens])
                      }
                    >
                      {"Max"}
                      {/* { (userBalance ? ` (${displayTokens} DYDX)` : "")} */}
                    </Link>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment
                    sx={{ width: "30px", height: "30px" }}
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
                  e.target.value.match(/([0-9]*(\.[0-9]{0,18})?)/)?.[0] || "0";

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
                  match: e.target.value.match(/([0-9]*(\.[0-9]{0,18})?)/)?.[0],
                });

                const [int, dec] = amount.split(".");

                const displayAmount = `${int.replace(/^00/, "0")}${
                  typeof dec === "undefined" ? "" : `.${dec}`
                }`;

                return setAmountToDelegate([
                  bigAmount,
                  displayAmount.length === 2 &&
                  displayAmount[0] === "0" &&
                  displayAmount[1] !== "."
                    ? displayAmount[1]
                    : displayAmount,
                ]);
              }}
              //   value={(amountToBridge / BigInt(1e18)).toString()}
              value={amountToDelegate[1]}
              sx={{ mb: 1 }}
            />
            <ValidatorSelect
              validatorAddress={selectedValidator}
              onChange={setSelectedValidator}
            />
          </Box>
          {isWalletConnected && (
            <LoadingButton
              disabled={amountToDelegate[0] === BigInt(0)}
              loading={
                signingAndBroadcasting
                //   approvalData.isLoading ||
                // approvalTx.isLoading || writeParams?.isLoading
              }
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => onSubmit(amountToDelegate[0])}
              sx={{ mt: 3, mb: 2 }}
            >
              Stake
            </LoadingButton>
          )}
        </AccordionDetails>
      </Accordion>
      <Box>
        {!!txHash && (
          <Alert severity={"info"}>
            <Link
              target="_blank"
              referrerPolicy="no-referrer"
              href={`https://mintscan.io/dydx/tx/${txHash}`}
            >
              View Stake Tx on Mintscan
            </Link>
          </Alert>
        )}
      </Box>
    </Box>
  );
};
