import { ExpandMore } from "@mui/icons-material";
import { usePrepareWrappedDydxTokenBridge } from "../generated";
import { is0xAddress, WDYDX_CONTRACT } from "../Form/Form";
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
import { useEffect, useMemo, useState } from "react";
import {
  bech32Validity,
  ReceiverAddressInput,
} from "../ReceiverAddressInput/ReceiverAddressInput";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { toHex } from "viem";
import { dydxToEth } from "../../utils/ethToDydx";
import { isLeft, isRight, tryCatch } from "fp-ts/lib/Either";
import { useChain } from "@cosmos-kit/react";

export const formatToken = (amount: bigint) => {
  const amountStr = amount.toString();

  return amount
    ? Number(
        amount / BigInt(1e18) +
          "." +
          amountStr.substring(Math.max(0, amountStr.length - 18))
      ).toString()
    : 0;
};

type Props = {
  address: `0x${string}` | undefined;
  onSubmit: (allowanceAmount: bigint) => void;
  onRecipientChange: (recipient: string) => void;
  cosmosAddress: string | undefined;
  allowanceAmount: bigint | undefined;
  onBridgeSuccess: () => void;
};

export const BridgeStep = ({
  address: ethAddress,
  // cosmosAddress,
  onSubmit,
  onRecipientChange,
  allowanceAmount,
  onBridgeSuccess,
}: Props) => {
  const { isWalletConnected, isWalletConnecting, connect } = useChain("dydx");
  const [expanded, setExpanded] = useState<boolean>(
    (allowanceAmount && allowanceAmount > 0n) || false
  );
  const [cosmosAddress, setCosmosAddress] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !bridgeData.isError && approveWrite && approveWrite();
  };

  const [cosmosEthAddress, verifiedCosmosEthAddress] = useMemo(() => {
    const cosmosEthAddress = cosmosAddress
      ? tryCatch(
          () => dydxToEth(cosmosAddress)?.toLowerCase(),
          () => undefined
          // @ts-ignore
        )?.right
      : undefined;
    const verifiedCosmosEthAddress = is0xAddress(cosmosEthAddress)
      ? cosmosEthAddress
      : undefined;

    return [cosmosEthAddress, verifiedCosmosEthAddress];
  }, [cosmosAddress]);

  // console.log({ cosmosEthAddress });

  const { config: bridgeConfig, ...bridgeData } =
    usePrepareWrappedDydxTokenBridge({
      chainId: 1,
      account: ethAddress,
      args:
        (typeof allowanceAmount !== "undefined" &&
          typeof verifiedCosmosEthAddress !== "undefined" && [
            allowanceAmount,
            verifiedCosmosEthAddress,

            // `0x${"0"}`,
            // 60000000000000000000000n,
            // "0xbe71c95476362c25db4e8d4ff0c65ed18d2f18cc",
            toHex(""),
          ]) ||
        undefined,

      // amount: amountToBridge.toString(),
    });
  const {
    data: approveData,
    write: approveWrite,
    ...writeParams
  } = useContractWrite(bridgeConfig);

  const approvalTx = useWaitForTransaction({ hash: approveData?.hash });

  useEffect(() => {
    !!allowanceAmount && allowanceAmount > 0n && setExpanded(true);
  }, [allowanceAmount]);

  const approval = approvalTx.data;

  useEffect(() => {
    if (approval && approval.status === "success") {
      onBridgeSuccess();
      setExpanded(false);
    }
  }, [approval, onBridgeSuccess]);

  const formattedAllowance = formatToken(allowanceAmount || 0n);

  return (
    <Box
      component="form"
      flexGrow={1}
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid item xs={12}>
        <Accordion
          style={{ borderRadius: "4px" }}
          expanded={allowanceAmount !== 0n && expanded}
          disabled={allowanceAmount === 0n}
        >
          <AccordionSummary
            onClick={() => setExpanded(!expanded)}
            expandIcon={allowanceAmount !== 0n && <ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Bridge Tokens</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <>
              <Box textAlign="center" style={{ marginBottom: "15px" }}>
                <Typography variant="h6">{`${formattedAllowance} DYDX`}</Typography>
              </Box>

              <ReceiverAddressInput
                value={cosmosAddress || ""}
                onChange={setCosmosAddress}
              />
            </>

            <Box sx={{ mt: 1 }}>Est Bridging Time: ~32 hours</Box>

            {isWalletConnected ||
            (cosmosAddress && isRight(bech32Validity(cosmosAddress))) ? (
              <LoadingButton
                disabled={
                  !allowanceAmount ||
                  !cosmosAddress ||
                  isLeft(bech32Validity(cosmosAddress))
                }
                loading={
                  //   approvalData.isLoading ||
                  approvalTx.isLoading || writeParams?.isLoading
                }
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Bridge Tokens
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={isWalletConnecting}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={connect}
              >
                Connect Wallet for DYDX Chain Address
              </LoadingButton>
            )}
          </AccordionDetails>
        </Accordion>{" "}
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
                View Bridge TX on Etherscan
              </Link>
            </Alert>
          )}
        </Box>
      </Grid>
    </Box>
  );
};
