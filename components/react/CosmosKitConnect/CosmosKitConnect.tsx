import { useChain } from "@cosmos-kit/react";
import { Box, Button, Typography } from "@mui/material";

type Props = {};

export const CosmosKitConnect = ({}: Props) => {
  const {
    isWalletConnected,
    isWalletConnecting,
    connect,
    disconnect,
    isWalletDisconnected,
    address,
  } = useChain("dydx");

  return (
    <Box>
      {isWalletConnected ? (
        <Box>
          <Typography>{address}</Typography>
          <Button onClick={disconnect}>Disconnect</Button>
        </Box>
      ) : (
        <Button
          onClick={connect}
          disabled={isWalletConnected || isWalletConnecting}
        >
          Connect
        </Button>
      )}
    </Box>
  );
};
