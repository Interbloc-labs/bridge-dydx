import { Box, Container } from "@mui/material";
import { useAccount } from "wagmi";
import { CosmosKitConnect } from "../CosmosKitConnect/CosmosKitConnect";
// import { Modal } from "@interchain-ui/react";

type Props = {};

export const Header = () => {
  const { address, isConnected, isConnecting } = useAccount();
  return (
    <Box
      flexDirection="row"
      flexGrow={1}
      justifyContent="flex-end"
      width={"100%"}
    >
      <w3m-connect-button label="Eth Connect Wallet" />
      <CosmosKitConnect />
    </Box>
  );
};
