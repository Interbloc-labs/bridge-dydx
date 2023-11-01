import { Box, Container } from "@mui/material";
import { useAccount } from "wagmi";

import { CosmosKitConnect } from "../CosmosKitConnect/CosmosKitConnect";
import { Button } from "@mui/material";

export const Header = () => {
  const { address, connect, isConnecting, isDisconnected, isConnected } =
    useAccount();
  return (
    <Box
      flexDirection="row"
      flexGrow={1}
      justifyContent="flex-end"
      width={"100%"}
    >
      test
      {isConnected ? (
        <w3m-button />
      ) : (
        <Button onClick={connect} label="ETH Connect Wallet" />
      )}
      <CosmosKitConnect />
    </Box>
  );
};
