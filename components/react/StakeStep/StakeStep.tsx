import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Chip,
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
      const client = await getSigningStargateClient();

      const value = cosmos.staking.v1beta1.MsgDelegate.fromPartial({
        delegatorAddress: address,
        validatorAddress: "dydxvaloper15004ysvmqnqzkvt7x6s4cd53flmmvgfvyqk90h",
        amount: {
          denom: "adydx",
          amount: delegationAmount.toString(),
        },
      });
      const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value,
      };

      client
        .signAndBroadcast(address, [msg], "auto", "Stake DYDX")
        .then((res) => {
          console.log(res);
          setTxHash(res.transactionHash);
        });
    },
    [address, getSigningStargateClient]
  );

  return (
    <Box gap={"small"} flexGrow={1} sx={{ mt: 3 }}>
      <Accordion style={{ borderRadius: "4px" }} expanded={expanded}>
        <AccordionSummary
          onClick={() => setExpanded(!expanded)}
          expandIcon={<ExpandMore />}
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
          <Box sx={{ columnGap: 2 }}>
            <Chip
              label={`${displayTokens} DYDX Available`}
              style={{ marginBottom: "15px" }}
            />
            <TextField
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
                    sx={{ width: 35, height: 35 }}
                    position="start"
                  >
                    <img
                      style={{ borderRadius: "50%" }}
                      src="https://assets.coingecko.com/coins/images/17500/standard/hjnIm9bV.jpg?1696517040"
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

                return setAmountToDelegate([
                  bigAmount,
                  `${int.replace(/^00/, "0")}${
                    typeof dec === "undefined" ? "" : `.${dec}`
                  }`,
                ]);
              }}
              //   value={(amountToBridge / BigInt(1e18)).toString()}
              value={amountToDelegate[1]}
            />
          </Box>
          {isWalletConnected ? (
            <LoadingButton
              disabled={amountToDelegate[0] === BigInt(0)}
              loading={
                false
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
          ) : (
            <LoadingButton
              type="button"
              disabled={isWalletConnecting}
              onClick={connect}
            >
              Connect Wallet
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
